import selectGPT4 from "./selectGPT4";
import logOut from "./logOut";
import {currentBrowser, currentPage, setCurrentPage} from "./globalVariable";
import checkMessageLimited from "./checkMessageLimited";

export default async function checkLogin(): Promise<boolean> {
    setCurrentPage(await currentBrowser.newPage());
    currentPage.setDefaultTimeout(10000);
    await currentPage.goto('https://chat.openai.com/');
    await currentPage.waitForSelector('[data-testid="login-button"]', {timeout: 1000}).catch(() => {
    });
    const loginButton = await currentPage.$('[data-testid="login-button"]');
    if (loginButton) return true;

    await selectGPT4();
    const resultCheckMessage = await checkMessageLimited();
    if (resultCheckMessage.limited) {
        await logOut();
        return true;
    }
    console.log('FIND OUT ACCOUNT');
    return false;
}