import {Browser, Page} from "puppeteer";

let currentPage: Page;

let logPage: Page;
let currentBrowser: Browser;

function setCurrentPage(page: Page) {
    currentPage = page;
}

function setCurrentBrowser(browser: Browser) {
    currentBrowser = browser;
}

function setLogPage(page: Page) {
    logPage = page;
}

export {currentBrowser, currentPage, setCurrentBrowser, setCurrentPage, logPage, setLogPage};