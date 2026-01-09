import { Page, expect, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly errorBanner: Locator;
  readonly addToCartButton: Locator;
  readonly removeButton: Locator;
  readonly cartBadge: Locator;
  readonly openMenuButton: Locator;
  readonly logOutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.locator('[data-test="username"]');
    this.passwordField = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorBanner = page.locator('[data-test="error"]');
    this.addToCartButton = page.locator('#add-to-cart-sauce-labs-backpack');
    this.removeButton = page.locator('[name="remove-sauce-labs-backpack"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.openMenuButton = page.locator('#react-burger-menu-btn');
    this.logOutButton = page.locator('#logout_sidebar_link');
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  async expectOnInventory() {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.page.locator('[data-test="title"]')).toHaveText('Products');
  }

  async expectLoginError(message?: string) {
    await expect(this.errorBanner).toBeVisible();
    if (message) {
      await expect(this.errorBanner).toContainText(message);
    }
  }

  async addProductToCart() {
    await this.addToCartButton.click();
    await expect(this.removeButton).toBeEnabled();
  }

  async removeProductFromCart() {
    await this.removeButton.click();
  }

  async expectCartCount(count: number) {
    if (count > 0) {
      await expect(this.cartBadge).toHaveText(String(count));
    } else {
      await expect(this.cartBadge).toBeHidden();
    }
  }
  async logOut() {
    await this.openMenuButton.click();
    await this.logOutButton.click();
    await this.expectLoggedOut();
  }

  async expectLoggedOut() {
    await expect(this.loginButton).toBeVisible();
    await expect(this.usernameField).toHaveValue('');
    await expect(this.passwordField).toHaveValue('');
    await expect(this.page).not.toHaveURL(/inventory\.html/);
  }
}
