import { BasePage } from "../base.page";
import { Locator, Page } from "@playwright/test";

export default class SauceProductsPage extends BasePage {
    
    productsList: Locator;


    constructor(page: Page) {
        super(page);
        this.productsList = this.page.locator('.inventory_item');
    }  

    async addProductToCart(productName: string) {
        const productLocator = this.productsList.filter({ hasText: productName });
        const addToCartButton = productLocator.locator('button');
        await addToCartButton.click();
    }
}