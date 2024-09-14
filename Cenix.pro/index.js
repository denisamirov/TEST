const puppeteer = require('puppeteer');


(async () => {

    const link = process.argv[2]
    const region = process.argv[3]

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage({ waitUntil: 'networkidle0' });
    await page.goto(link);


    await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
    });

    await new Promise(r => setTimeout(r, 15000));
    await page.waitForSelector('.UiHeaderHorizontalBase_region__2ODCG', { timeout: 10000 })
        .then(element => {
            console.log(element)
            element.click();
        })
        .catch(error => console.log(error));

    await page.waitForSelector(".UiRegionListBase_list__cH0fK", { timeout: 10000 })
        .then(async (element) => {
            const regionList = await page.$eval('.UiRegionListBase_list__cH0fK', erw => erw.innerHTML)
            const regionListSplit = regionList.split('</li>');


            for (let i = 0; i < regionListSplit.length; i++) {
                const regionFromPage = regionListSplit[i].slice(regionListSplit[i].indexOf('>') + 1,)
                if (region == regionFromPage) {
                    console.log(region, regionFromPage)
                    await new Promise(r => setTimeout(r, 2000));
                    await page.waitForSelector('.UiRegionListBase_list__cH0fK li:nth-child(2)')
                    await page.click(`.UiRegionListBase_list__cH0fK li:nth-child(${i + 1})`);
                }
                else {
                    console.log('no', region, regionFromPage)
                }

            }
        })



    await page.waitForSelector('.Price_role_old__r1uT1');
    const x = await page.$eval('.Price_role_old__r1uT1', erw => erw.textContent)

    await page.waitForSelector('.ActionsRow_stars__EKt42');
    const y = await page.$eval('.ActionsRow_stars__EKt42', erw => erw.title)

    await page.waitForSelector('.ActionsRow_reviewsWrapper__D7I6c');
    const z = await page.$eval('.ActionsRow_reviewsWrapper__D7I6c', erw => erw.textContent)

    console.info(x, y, z);

    await page.waitForSelector('#__next')
        .then(async () => {
            await page.screenshot({
                path: 'screenshot.jpg'
            });
            // await browser.close();
        });


})();