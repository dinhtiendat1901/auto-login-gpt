import {currentPage} from "./globalVariable";

export default async function selectGPT4() {
    await currentPage.waitForSelector('.group.flex.cursor-pointer.items-center.gap-1.rounded-xl.py-2.px-3.text-lg.font-medium');
    await currentPage.click('.group.flex.cursor-pointer.items-center.gap-1.rounded-xl.py-2.px-3.text-lg.font-medium');
    await currentPage.waitForSelector('[data-radix-collection-item]');
    await (await currentPage.$$('[data-radix-collection-item]'))[0].click();
    await currentPage.waitForSelector('.btn.relative.btn-neutral.group.w-full.whitespace-nowrap.rounded-xl.px-4.py-3.text-left.text-gray-700');
    await (await currentPage.$$('.btn.relative.btn-neutral.group.w-full.whitespace-nowrap.rounded-xl.px-4.py-3.text-left.text-gray-700'))[0].click();
}