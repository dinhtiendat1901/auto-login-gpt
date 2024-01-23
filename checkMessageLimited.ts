import {currentPage} from "./globalVariable";

interface CheckMessageLimitResult {
    limited: boolean,
    time: string
}

export default async function checkMessageLimited(): Promise<CheckMessageLimitResult> {
    await currentPage.waitForSelector('.flex.items-center.gap-6', {timeout: 7000}).catch(() => {
    });
    const messageLimit = await currentPage.$('.flex.items-center.gap-6');
    if (messageLimit) {
        const message = await currentPage.evaluate(() => {
            return document.querySelector('.flex.items-center.gap-6')!.childNodes[0].textContent;
        });
        return {
            limited: true,
            time: message!
        }
    }
    return {
        limited: false,
        time: ''
    }
}