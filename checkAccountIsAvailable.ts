import checkMessageIsLimited from "./checkMessageIsLimited";
import logOut from "./logOut";
import logIn from "./logIn";
import {currentPage, setCurrentPage, currentBrowser} from "./globalVariable";
import checkGPT4IsAvailable from "./checkGPT4IsAvailable";

export default async function checkAccountIsAvailable(id: string, password: string): Promise<boolean> {
    setCurrentPage(await currentBrowser.newPage());
    await currentPage.goto('https://chat.openai.com/');
    await logIn(id, password);


    await currentPage.waitForSelector('.flex.w-full.items-center.gap-2.rounded-lg.border.border-gray-100.bg-gray-50.p-4', {timeout: 1000}).catch(() => {
    });
    const workspaceButton = await currentPage.$('.flex.w-full.items-center.gap-2.rounded-lg.border.border-gray-100.bg-gray-50.p-4');
    if (workspaceButton) await currentPage.click('.flex.w-full.items-center.gap-2.rounded-lg.border.border-gray-100.bg-gray-50.p-4');
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