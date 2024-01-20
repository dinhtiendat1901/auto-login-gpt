import puppeteer from 'puppeteer-extra'
import StealthPlugin from "puppeteer-extra-plugin-stealth"
import getListAccount from "./readSheet";
import checkMessage from "./checkMessage";

(async () => {
    const browser = await puppeteer.use(StealthPlugin()).launch({
        headless: false,
        defaultViewport: null,
        userDataDir: './section'
    });
    const listAccount = await getListAccount();
    for (const gptAccount of listAccount) {
        const result = await checkMessage(browser, gptAccount.id, gptAccount.password);
        if (result) {
            console.log('Find out account');
            break;
        }
    }

})();