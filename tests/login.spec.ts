import { test } from '../fixtures/test-base';
import { LoginPage } from '../pages/LoginPage';

const VALID_USER = process.env.E2E_USER ?? 'standard_user';
const VALID_PASS = process.env.E2E_PASS ?? 'secret_sauce';

test('allows standard user to log in', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(VALID_USER, VALID_PASS);
  await loginPage.expectOnInventory();
});

test('shows error for locked out user', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login('locked_out_user', 'secret_sauce');
  await loginPage.expectLoginError('Sorry, this user has been locked out.');
});

test('add a product in cart', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(VALID_USER, VALID_PASS);
  await loginPage.expectOnInventory();
  await loginPage.addProductToCart();
  await loginPage.expectCartCount(1);
});

test('remove product from cart', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(VALID_USER, VALID_PASS);
  await loginPage.expectOnInventory();
  await loginPage.addProductToCart();
  await loginPage.removeProductFromCart();
  await loginPage.expectCartCount(0);
});

test('shows error for wrong password', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(VALID_USER, 'bad-pass');
  await loginPage.expectLoginError();
});

test('shows error when username is missing', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login('', VALID_PASS);
  await loginPage.expectLoginError('Epic sadface: Username is required');
});

test('shows error when password is missing', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(VALID_USER, '');
  await loginPage.expectLoginError('Epic sadface: Password is required');
});

test('shows error for invalid username', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login('not_a_user', VALID_PASS);
  await loginPage.expectLoginError(
    'Epic sadface: Username and password do not match any user in this service',
  );
});

test('allows login with Enter key', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.usernameField.fill(VALID_USER);
  await loginPage.passwordField.fill(VALID_PASS);
  await loginPage.passwordField.press('Enter');
  await loginPage.expectOnInventory();
});

test('redirects to login when accessing inventory without session', async ({
  loginPage,
}) => {
  await loginPage.page.goto('/inventory.html');
  await loginPage.expectLoggedOut();
});

test('keeps user on inventory after reload', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(VALID_USER, VALID_PASS);
  await loginPage.expectOnInventory();
  await loginPage.page.reload();
  await loginPage.expectOnInventory();
});

test('correct logout', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(VALID_USER, VALID_PASS);
  await loginPage.logOut();
  await loginPage.expectLoggedOut();
});
