import puppeteer from 'puppeteer';

const yieldYakStableFarmsUrl = 'https://yieldyak.com/farms?farmType=stable';

const fetchFarms = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(yieldYakStableFarmsUrl);

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
                .replaceAll('$', '');
        }        
        const stableCoinSymbols = ['USDC.e', 'USDT.e', 'DAI.e', 'MIM', 'AM3D', 'AC4D'];
        const farmElements = [...document.getElementsByClassName('card')];
        console.log(farmElements.length);
        return farmElements
        .map((farmElement) => {
            return {
                provider: farmElement.getElementsByClassName('subtitle is-4')[0].textContent,
                coin: farmElement.getElementsByClassName('title is-2')[0].textContent,
                tvl: formatTVL(farmElement.getElementsByClassName('box is-dark')[0].textContent),
                farmAPY: formatAPY(farmElement.getElementsByClassName('box is-dark')[1].textContent)
            }
        })
        .filter(farm => stableCoinSymbols.includes(farm.coin));
    });

    console.log(farms);

    await browser.close();
}

await fetchFarms();