import {currentPage} from "./globalVariable";

export default async function logOut() {
    await currentPage.click('.flex.w-full.items-center.gap-2.rounded-lg.p-2.text-sm');
    await currentPage.waitForFunction(selector => {
        const elements = document.querySelectorAll(selector);
        return elements[elements.length - 1].childNodes[1].textContent === 'Log out';
    }, {}, '.flex.px-3.py-1.items-center.gap-3.cursor-pointer.text-sm');
    const listMenu = await currentPage.$$('.flex.px-3.py-1.items-center.gap-3.cursor-pointer.text-sm');
    await listMenu[listMenu.length - 1].click();
    await currentPage.waitForNavigation({waitUntil: 'networkidle0'});
}