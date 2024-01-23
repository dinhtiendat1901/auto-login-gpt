import {Browser, Page} from "puppeteer";

let currentPage: Page;
let currentBrowser: Browser;

function setCurrentPage(page: Page) {
    currentPage = page;
}

function setCurrentBrowser(browser: Browser) {
    currentBrowser = browser;
}

export {currentBrowser, currentPage, setCurrentBrowser, setCurrentPage};