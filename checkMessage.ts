import selectGPT4 from "./selectGPT4";
import logOut from "./logOut";
import logIn from "./logIn";
import {currentPage, setCurrentPage, currentBrowser} from "./globalVariable";

export default async function checkMessage(id: string, password: string): Promise<boolean> {
    setCurrentPage(await currentBrowser.newPage());
    currentPage.setDefaultTimeout(10000);
    await currentPage.goto('https://chat.openai.com/');
    await logIn(id, password);


    await currentPage.waitForSelector('.flex.w-full.items-center.gap-2.rounded-lg.border.border-gray-100.bg-gray-50.p-4', {timeout: 1000}).catch(() => {
    });
    const workspaceButton = await currentPage.$('.flex.w-full.items-center.gap-2.rounded-lg.border.border-gray-100.bg-gray-50.p-4');
    if (workspaceButton) await currentPage.click('.flex.w-full.items-center.gap-2.rounded-lg.border.border-gray-100.bg-gray-50.p-4');
    await selectGPT4();
    await currentPage.waitForSelector('.flex.items-center.gap-6', {timeout: 7000}).catch(() => {
    });
    const messageLimit = await currentPage.$('.flex.items-center.gap-6');
    if (messageLimit) {
        // const message = await currentPage.evaluate(() => {
        //     return document.querySelector('.flex.items-center.gap-6')!.childNodes[0].textContent;
        // });
        await logOut();
        return false;
    }
    return true;
}