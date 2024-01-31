import puppeteer from 'puppeteer-extra'
import StealthPlugin from "puppeteer-extra-plugin-stealth"
import {setCurrentBrowser} from "./globalVariable";
import getListAccount from "./getListAccount";
import checkAccountIsLogin from "./checkAccountIsLogin";
import checkAccountIsAvailable from "./checkAccountIsAvailable";
import logIn from "./logIn";

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

    if (await checkAccountIsLogin()) return;
    const listAccount = await getListAccount();
    if (!(await checkAccountIsAvailable(listAccount[0].id, listAccount[0].password))) {
        await logIn(listAccount[1].id, listAccount[1].password);
    }

})();