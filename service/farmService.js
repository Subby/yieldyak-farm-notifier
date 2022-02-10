import puppeteer from 'puppeteer';
const yieldYakStableFarmsUrl = 'https://yieldyak.com/farms?farmType=stable';

const fetchFarms = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(yieldYakStableFarmsUrl);
    await page.waitForTimeout(3000);

    const farms = await page.evaluate(() => {
        const formatTVL = (value) => {
            return value
                .replaceAll('TVL', '')
                .replaceAll(' ', '');
        } 
        const formatAPY = (value) => {
            return value
                .replaceAll('APY', '')
                .replaceAll(' ', '')
                .replaceAll('$', '')
                .replaceAll('%', '')
                .replaceAll('*', '');
        }        
        const stableCoinSymbols = ['USDC.e', 'USDT.e', 'DAI.e', 'MIM'];
        const farmElements = [...document.getElementsByClassName('card')];
        console.log(farmElements.length);
        return farmElements
        .map((farmElement) => {
            return {
                provider: farmElement.getElementsByClassName('subtitle is-4')[0].textContent.replaceAll(' ', ''),
                coin: farmElement.getElementsByClassName('title is-2')[0].textContent,
                tvl: formatTVL(farmElement.getElementsByClassName('box is-dark')[0].textContent),
                farmAPY: formatAPY(farmElement.getElementsByClassName('box is-dark')[1].textContent),
                contractAddress: farmElement.getElementsByTagName('a')[0].href.replaceAll('https://yieldyak.com/farms/detail/', '')
            }
        })
        .filter(farm => stableCoinSymbols.includes(farm.coin) && farm.farmAPY !== 'tbd')
        .sort((a, b) => new Number(b.farmAPY) - new Number(a.farmAPY));
    });
    await browser.close();
    return farms;
}

export default fetchFarms;