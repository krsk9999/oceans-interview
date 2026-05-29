import { test, expect } from '@playwright/test';
import SauceLoginPage from '../src/pages/saucedemo/home.page';
import SauceProductsPage from '../src/pages/saucedemo/products.page';
const users = require('../src/test-data/users.json').users;
const password = require('../src/test-data/users.json').password;

test.describe('SauceDemo Login Tests', async () => {
    let loginPage: SauceLoginPage;
    
    test.beforeEach(async ({ page }) => {
        loginPage = new SauceLoginPage(page);
        await page.goto(process.env.BASE_URL || 'https://www.saucedemo.com/');
    }); 

    test('should login with valid credentials', async ({ page }) => {

        await test.step('Login with valid credentials', async () => {
            const username = users[0];
            await expect(loginPage.usernameInput).toBeVisible();
            await expect(loginPage.passwordInput).toBeVisible();
            await expect(loginPage.loginButton).toBeVisible();
            await loginPage.login(username, password);
        });

        await test.step('Verify successful login', async () => {
            await expect(page).toHaveURL(/inventory.html/);
            await expect(page.locator('.title')).toHaveText('Products');
        });

        await test.step('Add a product to Cart', async () => {
            const productName = 'Sauce Labs Backpack';
            const productPage = new SauceProductsPage(page);
            await productPage.addProductToCart(productName);
        });

    });

});