import {currentPage} from "./globalVariable";


export default async function checkWorkspaceIsLimited(workspaceIndex: number): Promise<boolean> {
    await currentPage.click('.flex.w-full.items-center.gap-2.rounded-lg.p-2.text-sm');
    const listMenu = await currentPage.$$('.flex.w-full.flex-col > .flex.px-3.py-1.items-center.gap-3.cursor-pointer.text-sm');
    await listMenu[workspaceIndex].click();
    await currentPage.waitForSelector('.btn.relative.btn-neutral.group.w-full.whitespace-nowrap.rounded-xl.px-4.py-3.text-left.text-token-text-primary');
    await (await currentPage.$$('.btn.relative.btn-neutral.group.w-full.whitespace-nowrap.rounded-xl.px-4.py-3.text-left.text-token-text-primary'))[0].click();
    await currentPage.waitForSelector('.flex.items-center.gap-6', {timeout: 7000}).catch(() => {
    });
    const messageLimit = await currentPage.$('.flex.items-center.gap-6');
    return !!messageLimit;

}