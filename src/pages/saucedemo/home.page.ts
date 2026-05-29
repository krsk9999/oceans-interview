import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base.page";

export default class SauceLoginPage extends BasePage {

    usernameInput: Locator;
    passwordInput: Locator;
    loginButton : Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = this.page.locator('#user-name');
        this.passwordInput = this.page.locator('#password');
        this.loginButton = this.page.locator('#login-button');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}