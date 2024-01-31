import {currentPage} from "./globalVariable";

export default async function (id: string, password: string) {
    await currentPage.waitForSelector('[data-testid="login-button"]');
    await currentPage.click('[data-testid="login-button"]');
    await currentPage.waitForSelector('#username');
    await currentPage.type('#username', id);
    await currentPage.waitForSelector('.c4900dc2e.cac92d701.c7024c898.c8f0f67a1');
    await currentPage.click('.c4900dc2e.cac92d701.c7024c898.c8f0f67a1');
    await currentPage.waitForSelector('#password');
    await currentPage.type('#password', password);
    await new Promise(r => setTimeout(r, 3000));
    await currentPage.click('.c4900dc2e.cac92d701.c7024c898.c8f0f67a1');
    await currentPage.waitForNavigation();
}