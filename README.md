# Playwright E2E Tests

Conjunto de pruebas end-to-end para Sauce Demo usando Playwright.

## Requisitos
- Node.js 18+ (npm incluido).
- Dependencias instaladas: `npm install`.

## Scripts utiles
- `npm test` - Ejecuta todos los tests en headless.
- `npm run test:headed` - Ejecuta con el navegador visible.
- `npm run test:ui` - Abre la UI de Playwright para lanzar/depurar casos.
- `npm run test:debug` - Modo debug (`PWDEBUG=1`) con navegador visible.

## Configuracion
Variables de entorno soportadas:
- `BASE_URL` - URL base (por defecto `https://www.saucedemo.com`).
- `HEADLESS` - `true`/`false` para forzar modo sin/con UI.
- `E2E_USER`, `E2E_PASS` - Credenciales a usar en los tests (por defecto `standard_user` / `secret_sauce`).

### Archivo .env
Para ejecuciones locales puedes usar un archivo `.env` en la raiz del proyecto.
Hay un ejemplo en `.env.example`. Copia ese archivo como `.env` y completa tus valores:
```dotenv
BASE_URL=https://www.saucedemo.com
E2E_USER=tu_usuario
E2E_PASS=tu_password
```
El archivo `.env` no se sube al repo (esta en `.gitignore`).

Playwright esta configurado para:
- Ejecutar en Chromium, Firefox y WebKit.
- `trace: 'on-first-retry'`, `screenshot: 'only-on-failure'`.
- Evitar `test.only` en CI (`forbidOnly`).

## Estructura
- `fixtures/test-base.ts`: fixtures compartidas (`loginPage`).
- `pages/LoginPage.ts`: Page Object del login y acciones de carrito basicas.
- `tests/login.spec.ts`: pruebas de login, carrito y logout.

## Ejecucion
Desde la raiz del repo:
- Todos los tests: `npm test`
- Un archivo: `npx playwright test tests/login.spec.ts`
- Un caso por titulo: `npx playwright test tests/login.spec.ts -g "add a product in cart"`

## Consejos
- Usa `npm run test:ui` para depurar visualmente.
- Si ajustas credenciales/URL, exporta `E2E_USER`, `E2E_PASS` y `BASE_URL`.
