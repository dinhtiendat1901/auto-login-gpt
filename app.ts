import puppeteer from 'puppeteer-extra'
import StealthPlugin from "puppeteer-extra-plugin-stealth"

(async () => {
    const browser = await puppeteer.use(StealthPlugin()).launch({
        headless: false,
        defaultViewport: null,
        userDataDir: './section'
    });

    const page = await browser.newPage();
    page.setDefaultTimeout(10000);
    await page.goto('https://chat.openai.com/');
    await page.waitForSelector('[data-testid="login-button"]', {timeout: 1000}).catch(() => {
    });
    const loginButton = await page.$('[data-testid="login-button"]');
    if (loginButton) {
        await page.click('[data-testid="login-button"]');
        await page.waitForSelector('#username');
        await page.type('#username', 'user5474@jcnorris.com');
        await page.click('.cf4ff3b5d.c5faccce1.cfccd0b2a.c901653c3');
        await page.waitForSelector('#password');
        await page.type('#password', 'Account@4642');


        await new Promise(r => setTimeout(r, 3000));
        await page.click('.cf4ff3b5d.c5faccce1.cfccd0b2a.c901653c3');


        await page.waitForSelector('.group.flex.cursor-pointer.items-center.gap-1.rounded-xl.py-2.px-3.text-lg.font-medium');
        await page.click('.group.flex.cursor-pointer.items-center.gap-1.rounded-xl.py-2.px-3.text-lg.font-medium');

        await page.waitForSelector('[data-radix-collection-item]');
        await (await page.$$('[data-radix-collection-item]'))[0].click();
    }
    await page.waitForSelector('.btn.relative.btn-neutral.group.w-full.whitespace-nowrap.rounded-xl.px-4.py-3.text-left.text-gray-700');
    await (await page.$$('.btn.relative.btn-neutral.group.w-full.whitespace-nowrap.rounded-xl.px-4.py-3.text-left.text-gray-700'))[0].click();
    await page.waitForSelector('.flex.items-center.gap-6', {timeout: 7000}).catch(() => {
    });
    const messageLimit = await page.$('.flex.items-center.gap-6');
    if (messageLimit) {
        // const message = await page.evaluate(() => {
        //     return document.querySelector('.flex.items-center.gap-6')!.childNodes[0].textContent;
        // });
        await page.click('.flex.w-full.items-center.gap-2.rounded-lg.p-2.text-sm');
        await page.waitForFunction(selector => {
            const elements = document.querySelectorAll(selector);
            return elements[elements.length - 1].childNodes[1].textContent === 'Log out';
        }, {}, '.flex.px-3.py-1.items-center.gap-3.cursor-pointer.text-sm');
        const listMenu = await page.$$('.flex.px-3.py-1.items-center.gap-3.cursor-pointer.text-sm');
        await listMenu[listMenu.length - 1].click();
    }

})();