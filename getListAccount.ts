import {currentBrowser} from "./globalVariable";

interface gptAccount {
    id: string,
    password: string
}


export default async function getListAccount(): Promise<gptAccount[]> {
    let listAccount: gptAccount[] = [];
    const accountPage = await currentBrowser.newPage();
    await accountPage.goto('https://evoto.vn/hemvl');
    await accountPage.waitForSelector('#username');
    await accountPage.type('#username', 'dinhtiendat258');
    await accountPage.click('[type="button"]');
    await new Promise(r => setTimeout(r, 6000));
    await accountPage.waitForSelector('#acceptTerms');
    await accountPage.click('#acceptTerms');
    const accountDetail = await accountPage.evaluate(() => {
        const accountDetail: string[] = [];
        accountDetail.push(document.querySelectorAll('[style="color: purple;"]')[0].childNodes[2].textContent!.split(':')[1].trim());
        accountDetail.push(document.querySelectorAll('[style="color: purple;"]')[0].childNodes[4].textContent!.split(':')[1].trim());
        accountDetail.push(document.querySelectorAll('[style="color: purple;"]')[1].childNodes[2].textContent!.split(':')[1].trim());
        accountDetail.push(document.querySelectorAll('[style="color: purple;"]')[1].childNodes[4].textContent!.split(':')[1].trim());
        return accountDetail;
    });
    listAccount.push({id: accountDetail[0], password: accountDetail[1]});
    listAccount.push({id: accountDetail[2], password: accountDetail[3]});

    return listAccount;
}