const puppeteer = require('puppeteer');
const fs = require('fs');


const viewportSettings = {
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
}
const timeoutCheckBrowser = 15000;
const selectors = {
    regionList: '.UiRegionListBase_list__cH0fK',
    regionMenu: '.UiHeaderHorizontalBase_region__2ODCG', 
    productStars: '.ActionsRow_stars__EKt42',
    productReviews: '.ActionsRow_reviews__AfSj_',
    productPriceInfo: '.PriceInfo_root__GX9Xp',
    regionSelect: '.UiRegionListBase_list__cH0fK',
};
const screenshotName = 'screenshot.jpg';
const fileResultName = 'product.txt';


(async () => {
    const link = process.argv[2]
    const region = process.argv[3]
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage({ waitUntil: 'networkidle0' });

    await page.goto(link);
    await page.setViewport(viewportSettings);
    
    await new Promise(r => setTimeout(r, timeoutCheckBrowser));

    await page.waitForSelector(selectors.regionMenu)
        .then(element => { element.click() })
        .catch(error => console.log(error));
    
    await page.waitForSelector(selectors.regionList)
        .then(async () => {
            let RegionIsFinded = false;
            const regionList = await page.$eval(selectors.regionList, erw => erw.innerHTML)
            const regionListSplit = regionList.split('</li>');

            for (let i = 0; i < regionListSplit.length; i++) {
                const regionFromPage = regionListSplit[i].slice(regionListSplit[i].indexOf('>') + 1,)
                if (region == regionFromPage) {
                    RegionIsFinded = true
                    // await new Promise(r => setTimeout(r, 2000));
                    await page.waitForSelector(`${selectors.regionSelect} li:nth-child(2)`);
                    await page.click(`${selectors.regionSelect} li:nth-child(${i + 1})`);
                }
            }

            if (!RegionIsFinded) {
                console.error(`Region ${region} is not founded`)
                await browser.close();
            }
        })

    const priceInfoTextContent = await getTextContentForPuppeteer(page, selectors.productPriceInfo, { timeout: 2000 });
    const reviews = await getTextContentForPuppeteer(page, selectors.productReviews);
    const price = parsePrice(priceInfoTextContent).price;
    const oldPrice = parsePrice(priceInfoTextContent).oldPrice;

    await page.waitForSelector(selectors.productStars);
    const stars = await page.$eval(selectors.productStars, erw => erw.title)

    await new Promise(r => setTimeout(r, 1000))
        .then(async () => {
            await page.screenshot({
                path: screenshotName
            });
            console.info('The parsing was completed successfully!')
            await browser.close();
        });

    fs.writeFile(fileResultName, `price=${cleanString(price)}\n`
        + `priceOld=${cleanString(oldPrice)}\nrating=${cleanString(stars)}\nreviewCount=${cleanString(reviews)}\n`, (err) => {
            err ? console.log(err) : console.info('Successful writing to a file!')
        });
})();


function cleanString(inputString) {
    console.log(inputString)
    if (!inputString) return null;
    let cleanedString = inputString.replace(/[^0-9,.]/g, '');
    return cleanedString.replace(/,/g, '.');
}


function parsePrice(str) {
    if (!str) {
        return { price: null, oldPrice: null };
    }
    const match = str.match(/(\d{1,3}(?:\s?\d{3})*(?:,\d{1,2})?)\s?₽Скидка\s?−?\d{1,2}%\s?(\d{1,3}(?:\s?\d{3})*(?:,\d{1,2})?)\s?₽\//);
    if (match) {
        const oldPrice = match[1].replace(/\s/g, '').replace('₽', '').replace(',', '.');
        const price = match[2].replace(/\s/g, '').replace('₽', '').replace(',', '.');
        return { price, oldPrice };
    } else {
        const match2 = str.match(/(\d{1,5}(?:\s?\d{3})*(?:,\d{1,2})?)\s?₽\//);
        if (match2) {
            const price = match2[1] ? match2[1].replace(/\s/g, '').replace('₽', '').replace(',', '.') : null;
            return { price };

        } else {
            throw new Error('Invalid input string format');
        }
    }
}


async function getTextContentForPuppeteer(page, selector) {
    try {
        await page.waitForSelector(selector);
        const res = await page.$eval(selector, erw => erw.textContent);
        return res;
    } catch (error) {
        return null;
    }
}