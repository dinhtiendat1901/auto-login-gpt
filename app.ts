import puppeteer from 'puppeteer-extra'
import StealthPlugin from "puppeteer-extra-plugin-stealth"
import getListAccount from "./readSheet";
import checkMessage from "./checkMessage";
import checkLogin from "./checkLogin";
import {setCurrentBrowser} from "./globalVariable";

(async () => {
    const pathToExtension = 'section/Default/Extensions/kbfnbcaeplbcioakkpcpgfkobkghlhen/14.1150.0_0';
    const browser = await puppeteer.use(StealthPlugin()).launch({
        headless: false,
        defaultViewport: null,
        userDataDir: './section',
        args: [
            `--load-extension=${pathToExtension}`,
        ],
    });
    setCurrentBrowser(browser);
    if (!(await checkLogin())) return;
    const listAccount = await getListAccount();
    for (const gptAccount of listAccount) {
        const result = await checkMessage(gptAccount.id, gptAccount.password);
        if (result) {
            console.log('FIND OUT ACCOUNT');
            break;
        }
    }

})();