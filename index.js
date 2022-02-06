import puppeteer from 'puppeteer';

const yieldYakStableFarmsUrl = 'https://yieldyak.com/farms?farmType=stable';

const fetchFarms = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(yieldYakStableFarmsUrl);

    const farms = await page.evaluate(() => {
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
                name: farmElement.getElementsByClassName('title is-2')[0].textContent,
                tvl: farmElement.getElementsByClassName('box is-dark')[0].textContent,
                farmAPY: farmElement.getElementsByClassName('box is-dark')[1].textContent
            }
        })
        .filter(farm => stableCoinSymbols.includes(farm.name));
    });

    console.log(farms);

    await browser.close();
}

fetchFarms();