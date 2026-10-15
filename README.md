# Playwright E-commerce Automation Framework

End-to-end browser automation for an e-commerce application. The project uses Playwright Test, TypeScript page objects, reusable test data, and environment-based credentials to automate sign-in, product selection, checkout, and order verification.

## At a glance

- **Test runner:** Playwright Test
- **Language:** TypeScript (with a small JavaScript sample spec)
- **Browser:** Chromium by default
- **Application under test:** `https://rahulshettyacademy.com/client`
- **Test styles:** tagged smoke coverage and data-driven regression coverage
- **Reports:** Playwright HTML report, traces, and screenshots

## What the tests cover

### Smoke test

The smoke test signs in with the configured account and verifies that products are visible on the dashboard.

### Regression order flow

The regression suite iterates over product names in `Utills/placeorderTestData.json`. For each product, it signs in, adds the product to the cart, checks the cart, completes checkout, selects India, and verifies the newly created order in the order history.

## Requirements

- Node.js (an actively supported LTS release is recommended)
- npm
- A valid account for the demo application

## Setup

1. Clone the repository and open its root directory.
2. Install the Node.js dependencies:

   ```bash
   npm install
   ```

3. Install the Playwright Chromium browser:

   ```bash
   npx playwright install chromium
   ```

   On Linux CI machines, install the browser's operating-system dependencies as well:

   ```bash
   npx playwright install --with-deps chromium
   ```

4. Create a local environment file from the template:

   ```bash
   cp .env.example .env
   ```

5. Edit `.env` and enter the credentials for your demo account:

   ```dotenv
   ECOM_BASE_URL=https://rahulshettyacademy.com
   ECOM_USERNAME=your-account-email
   ECOM_PASSWORD=your-account-password
   ```

The local `.env` file is ignored by Git. Do not commit real credentials or put them in test source files. The login-dependent tests are skipped when either credential is missing.

## Run the tests

Run all tests discovered by the configured Playwright project:

```bash
npm test
```

Run only the smoke test:

```bash
npm run test:smoke
```

Run the order-flow regression tests:

```bash
npm run test:regression
```

To see the browser while tests execute, append `-- --headed` to an npm script:

```bash
npm run test:smoke -- --headed
npm run test:regression -- --headed
```

Run both tagged suites together:

```bash
npx playwright test --grep '@smoke|@regression' --headed
```

Other useful Playwright commands:

```bash
# List discovered tests without executing them
npx playwright test --list

# Run one spec file
npx playwright test tests/smoke.spec.ts

# Run tests matching a title or tag
npx playwright test --grep '@regression'
```

## Run in GitHub Actions

The workflow in `.github/workflows/playwright.yml` runs the smoke and regression suites automatically when code is pushed to `main` or a pull request targeting `main` is updated. It can also be started manually:

1. In GitHub, open **Settings → Secrets and variables → Actions**.
2. Add repository secrets named `ECOM_USERNAME` and `ECOM_PASSWORD` for the demo test account. Do not put these credentials in the workflow file.
3. Optionally add the repository variable `ECOM_BASE_URL` if the test environment differs from the default host.
4. Push a commit to `main` (or update a pull request targeting `main`). To start a run manually, open **Actions → Playwright tests → Run workflow**.
5. Open the run under the **Actions** tab to see test results. Download its `playwright-report` artifact for the HTML report.

The workflow checks that both credential secrets are configured and fails clearly if either is missing. Pull requests from forks do not receive repository secrets by default, so their workflow run stops at that credential check.

## View the HTML report

Playwright writes the HTML report to `playwright-report/`. After a test run, serve and open the latest report with:

```bash
npx playwright show-report
```

The report includes test outcomes and links to available traces. The Playwright configuration also enables screenshots and traces; the report and raw test results are local generated artifacts and are excluded from Git.

## Project structure

```text
.
├── .env.example                  # Safe template for local environment variables
├── page-objects/                 # Reusable TypeScript page objects
│   ├── LoginPage.ts
│   ├── DashboardPage.ts
│   ├── CheckoutPage.ts
│   ├── OrderPage.ts
│   ├── ThankyouPage.ts
│   └── MyorderPage.ts
├── tests/
│   ├── smoke.spec.ts             # Sign-in and product visibility
│   └── ecommerce-order-flow.spec.ts # Data-driven product order regression
├── tests-examples/               # Playwright sample tests
├── Utills/
│   └── placeorderTestData.json   # Product cases used by regression tests
├── playwright.config.js          # Playwright defaults, browser, base URL, reporter
├── package.json                  # Dependencies and npm scripts
└── package-lock.json             # Reproducible dependency versions
```

### Page-object responsibilities

- `LoginPage` opens the login route and submits credentials.
- `DashboardPage` locates products, adds the requested product to the cart, and opens the cart.
- `CheckoutPage` verifies the selected product and proceeds to checkout.
- `OrderPage` selects a delivery country and places the order.
- `ThankyouPage` checks the confirmation and captures the order ID.
- `MyorderPage` finds the order in order history and verifies its details.

## Configuration

`playwright.config.js` loads `.env` with `dotenv`. The default base URL is `https://rahulshettyacademy.com`; override it with `ECOM_BASE_URL` when using a different compatible environment. The configured application login route is `/client/#/auth/login`.

Current Playwright settings include Chromium, a 30-second test timeout, a 20-second expectation timeout, HTML reporting, screenshots, and traces. Use the `--headed` CLI option to run with a visible browser.

## Adding regression products

Add another object with a `productName` property to `Utills/placeorderTestData.json`. The regression spec creates one order-flow test per data entry. The product name must match one available in the demo store.

## Troubleshooting

- **Login tests are skipped:** Make sure `.env` exists at the project root and both `ECOM_USERNAME` and `ECOM_PASSWORD` have values.
- **Browser executable is missing:** Run `npx playwright install chromium`.
- **The site cannot be reached:** Check connectivity and confirm `ECOM_BASE_URL` points to the expected application host.
- **A regression product is not found:** Check that the `productName` value matches a product currently displayed by the demo store.
- **The report command fails:** Run a test first to generate the HTML report, then run `npx playwright show-report` from the project root.

## Security

Use a dedicated demo or test account. Keep credentials in the ignored local `.env` file or a CI secret store, and rotate any credential that has been exposed. Never commit `.env`, passwords, access tokens, or other secrets.
