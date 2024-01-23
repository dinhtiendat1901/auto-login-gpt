import selectGPT4 from "./selectGPT4";
import logOut from "./logOut";
import logIn from "./logIn";
import {currentPage, setCurrentPage, currentBrowser} from "./globalVariable";
import checkMessageLimited from "./checkMessageLimited";

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
    const resultCheckMessage = await checkMessageLimited();
    if (resultCheckMessage.limited) {
        console.log(resultCheckMessage.time);
        await logOut();
        return false;
    }
    return true;
}