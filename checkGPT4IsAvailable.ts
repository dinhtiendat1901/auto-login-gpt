import {currentPage} from "./globalVariable";

export default async function checkGPT4IsAvailable(): Promise<boolean> {
    await currentPage.waitForSelector('.group.flex.cursor-pointer.items-center.gap-1.rounded-xl.py-2.px-3.text-lg.font-medium');
    await currentPage.click('.group.flex.cursor-pointer.items-center.gap-1.rounded-xl.py-2.px-3.text-lg.font-medium');
    await currentPage.waitForSelector('.btn.relative.btn-primary.w-full.text-xs', {timeout: 1000}).catch(() => {
    });
    const updateButton = await currentPage.$('.btn.relative.btn-primary.w-full.text-xs');
    if (updateButton) await currentPage.click('.group.flex.cursor-pointer.items-center.gap-1.rounded-xl.py-2.px-3.text-lg.font-medium');
    else {
        await currentPage.waitForSelector('[data-radix-collection-item]');
        await (await currentPage.$$('[data-radix-collection-item]'))[0].click();
    }
    return !updateButton;

}