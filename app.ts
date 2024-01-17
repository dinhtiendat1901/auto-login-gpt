import puppeteer from 'puppeteer-extra'
import StealthPlugin from "puppeteer-extra-plugin-stealth"

(async () => {
    const browser = await puppeteer.use(StealthPlugin()).launch({
        headless: false,
        // args: ['--start-maximized'],
        defaultViewport: null,
        userDataDir: './section'
    });

    const page = await browser.newPage();
    page.setDefaultTimeout(10000);
    await page.goto('https://chat.openai.com/', {waitUntil: 'networkidle0'});
    await page.waitForSelector('[data-testid="login-button"]');
    await page.click('[data-testid="login-button"]');
    await page.waitForNavigation({waitUntil: 'networkidle0'});
    await page.waitForSelector('#username');
    await page.type('#username', 'maithithuysn1972@gmail.com');
    await page.click('.cf4ff3b5d.c5faccce1.cfccd0b2a.c901653c3');
    await page.waitForSelector('#password');

    await page.type('#password', 'Vietanh1901@');
    await new Promise(r => setTimeout(r, 1000));
    await page.click('.cf4ff3b5d.c5faccce1.cfccd0b2a.c901653c3');

    await page.waitForSelector('.group.flex.cursor-pointer.items-center.gap-1.rounded-xl.py-2.px-3.text-lg.font-medium');
    await page.click('.group.flex.cursor-pointer.items-center.gap-1.rounded-xl.py-2.px-3.text-lg.font-medium');

    await page.waitForSelector('[data-radix-collection-item]');
    await (await page.$$('[data-radix-collection-item]'))[0].click();

    await page.waitForSelector('.btn.relative.btn-neutral.group.w-full.whitespace-nowrap.rounded-xl.px-4.py-3.text-left.text-gray-700');
    await (await page.$$('.btn.relative.btn-neutral.group.w-full.whitespace-nowrap.rounded-xl.px-4.py-3.text-left.text-gray-700'))[0].click();
    try {
        await page.waitForSelector('.flex.items-center.gap-6', {timeout: 3000});
        const message = await page.evaluate(() => {
            return document.querySelector('.flex.items-center.gap-6')!.childNodes[0].textContent;
        });
        console.log('message is:' + message);
    } catch (e) {
        console.log('con message');
    }
})();