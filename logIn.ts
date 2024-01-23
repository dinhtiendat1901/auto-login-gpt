import {currentPage} from "./globalVariable";

export default async function (id: string, password: string) {
    await currentPage.waitForSelector('[data-testid="login-button"]');
    await currentPage.click('[data-testid="login-button"]');
    await currentPage.waitForSelector('#username');
    await currentPage.type('#username', id);
    await currentPage.waitForSelector('.cf4ff3b5d.c5faccce1.cfccd0b2a.c901653c3');
    await currentPage.click('.cf4ff3b5d.c5faccce1.cfccd0b2a.c901653c3');
    await currentPage.waitForSelector('#password');
    await currentPage.type('#password', password);
    await new Promise(r => setTimeout(r, 3000));
    await currentPage.click('.cf4ff3b5d.c5faccce1.cfccd0b2a.c901653c3');
    await currentPage.waitForNavigation();
}