import {currentPage} from "./globalVariable";

export default async function (id: string, password: string) {
    await currentPage.waitForSelector('[data-testid="login-button"]');
    await currentPage.click('[data-testid="login-button"]');
    await currentPage.waitForSelector('#username');
    await currentPage.type('#username', id);
    await currentPage.waitForSelector('.cc0e61092.c24150cbf.cb6ae05ba.ce8acedbf');
    await currentPage.click('.cc0e61092.c24150cbf.cb6ae05ba.ce8acedbf');
    await currentPage.waitForSelector('#password');
    await currentPage.type('#password', password);
    await new Promise(r => setTimeout(r, 3000));
    await currentPage.click('.cc0e61092.c24150cbf.cb6ae05ba.ce8acedbf');
    await currentPage.waitForNavigation();
}