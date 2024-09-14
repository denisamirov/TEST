const puppeteer = require('puppeteer');
const fs = require('fs');

const viewportSettings = {
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
}
const timeoutCheckBrowser = 15000;


(async () => {

    const link = process.argv[2]
    const region = process.argv[3]

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage({ waitUntil: 'networkidle0' });

    await page.goto(link);
    await page.setViewport(viewportSettings);
    await new Promise(r => setTimeout(r, timeoutCheckBrowser));
    await page.waitForSelector('.UiHeaderHorizontalBase_region__2ODCG', { timeout: 10000 })
        .then(element => { element.click() })
        .catch(error => console.log(error));
    await page.waitForSelector(".UiRegionListBase_list__cH0fK", { timeout: 10000 })
        .then(async (element) => {
            let RegionIsFinded = false;
            const regionList = await page.$eval('.UiRegionListBase_list__cH0fK', erw => erw.innerHTML)
            const regionListSplit = regionList.split('</li>');

            for (let i = 0; i < regionListSplit.length; i++) {
                const regionFromPage = regionListSplit[i].slice(regionListSplit[i].indexOf('>') + 1,)
                if (region == regionFromPage) {
                    RegionIsFinded = true
                    await new Promise(r => setTimeout(r, 2000));
                    await page.waitForSelector('.UiRegionListBase_list__cH0fK li:nth-child(2)')
                    await page.click(`.UiRegionListBase_list__cH0fK li:nth-child(${i + 1})`);
                }
            }

            if (!RegionIsFinded) {
                console.error(`Регион ${region} не найден!`)
                await browser.close();
            }
        })


    async function getPrice(page, selector) {
        try {
            await page.waitForSelector(selector);
            const res = await page.$eval(selector, erw => erw.textContent);
            return res;
        } catch (error) {
            return null;
        }
    }


    const res = await getPrice(page, '.PriceInfo_root__GX9Xp', { timeout: 2000 });
    const z = await getPrice(page, '.ActionsRow_reviews__AfSj_')
    const a = parsePrice(res).price
    const x = parsePrice(res).oldPrice

    await page.waitForSelector('.ActionsRow_stars__EKt42');
    const y = await page.$eval('.ActionsRow_stars__EKt42', erw => erw.title)

    await new Promise(r => setTimeout(r, 1000))
        .then(async () => {
            await page.screenshot({
                path: 'screenshot.jpg'
            });
            console.info('Парсинг завершился успешно')
            await browser.close();
        });

    fs.writeFile('product.txt', `price=${cleanString(a)}\n`
        + `priceOld=${cleanString(x)}\nrating=${cleanString(y)}\nreviewCount=${cleanString(z)}\n`, (err) => {
            err ? console.log(err) : console.info('Успешная запись в файл')
        });
})();



function cleanString(inputString) {
    console.log(inputString)
    if (!inputString) return null;
    let cleanedString = inputString.replace(/[^0-9,.]/g, '');
    cleanedString = cleanedString.replace(/,/g, '.');
    return cleanedString;
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