import checkMessageIsLimited from "./checkMessageIsLimited";
import logOut from "./logOut";
import {currentBrowser, currentPage, setCurrentPage} from "./globalVariable";
import checkGPT4IsAvailable from "./checkGPT4IsAvailable";

export default async function checkAccountIsLogin(): Promise<boolean> {
    setCurrentPage(await currentBrowser.newPage());
    currentPage.setDefaultTimeout(10000);
    await currentPage.goto('https://chat.openai.com/');
    await currentPage.waitForSelector('[data-testid="login-button"]', {timeout: 1000}).catch(() => {
    });
    const loginButton = await currentPage.$('[data-testid="login-button"]');
    if (loginButton) return false;
    if (!(await checkGPT4IsAvailable())) {
        await logOut();
        return false;
    }
    if (await checkMessageIsLimited()) {
        await logOut();
        return false;
    }
    return true;
}