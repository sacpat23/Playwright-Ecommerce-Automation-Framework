# Playwright E-Commerce Automation Framework

A scalable end-to-end test automation framework built using **Playwright, TypeScript, and Node.js** for testing an e-commerce web application.

The framework follows the **Page Object Model (POM)** design pattern and is structured to support maintainable, reusable, and reliable UI automation.

## 🚀 Features

* End-to-end UI automation using Playwright
* TypeScript-based test automation
* Page Object Model (POM)
* Reusable page components and utilities
* Data-driven testing
* Parallel test execution
* Cross-browser testing
* Auto-waiting and built-in Playwright assertions
* Screenshot capture on test failure
* Video recording on failure
* Trace collection for debugging
* HTML test reporting
* API and UI testing support
* Environment-based configuration
* CI/CD ready
* GitHub integration

## 🏗️ Framework Architecture

```text
Playwright-Ecommerce-Automation-Framework
│
├── .github/
│
├── .vscode/
│
├── pageobjects/
│   └── JavaScript page objects
│
├── pageobjects_ts/
│   └── TypeScript page objects
│
├── tests/
│   └── Test specifications
│
├── tests-examples/
│   └── Example tests
│
├── Utils/
│   └── Test data and utility files
│
├── playwright.config.js
├── package.json
├── package-lock.json
└── README.md
```

## 🛠️ Tech Stack

| Technology        | Purpose                    |
| ----------------- | -------------------------- |
| Playwright        | Browser automation         |
| TypeScript        | Test development           |
| JavaScript        | Supporting automation code |
| Node.js           | Runtime environment        |
| npm               | Dependency management      |
| Page Object Model | Framework design           |
| Git               | Version control            |
| GitHub            | Source code management     |

## 📋 Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Git
* VS Code (recommended)

Verify the installation:

```bash
node --version
npm --version
git --version
```

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/sacpat23/Playwright-Ecommerce-Automation-Framework.git
```

Navigate to the project:

```bash
cd Playwright-Ecommerce-Automation-Framework
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

## ▶️ Running Tests

Run all Playwright tests:

```bash
npx playwright test
```

Run tests with the browser visible:

```bash
npx playwright test --headed
```

Run a specific test file:

```bash
npx playwright test tests/sample.spec.ts
```

Run tests using a specific browser:

```bash
npx playwright test --project=chromium
```

Run tests in debug mode:

```bash
npx playwright test --debug
```

## 📊 Test Reports

After execution, generate and open the HTML report:

```bash
npx playwright show-report
```

The framework can also collect:

* Screenshots
* Videos
* Playwright traces
* HTML reports

These artifacts help investigate test failures and improve debugging efficiency.

## 🔍 Debugging

Run a failed test with the Playwright Inspector:

```bash
npx playwright test --debug
```

View the trace:

```bash
npx playwright show-trace path/to/trace.zip
```

## 🧪 Test Design

The framework uses the **Page Object Model** approach.

Example:

```text
Test
 │
 ├── LoginPage
 │
 ├── DashboardPage
 │
 ├── ProductPage
 │
 ├── CheckoutPage
 │
 └── OrderPage
```

Page-specific locators and actions are maintained inside page object classes, while test specifications focus on business scenarios and validations.

## 🔄 Test Execution Flow

```text
Test Specification
        ↓
Page Object
        ↓
Playwright Browser
        ↓
E-Commerce Application
        ↓
Assertions
        ↓
Test Report
```

## 📈 Future Enhancements

Planned improvements include:

* GitHub Actions CI/CD pipeline
* API automation
* Advanced fixtures
* Environment configuration
* Docker execution
* Cross-browser execution
* Advanced reporting
* Test tagging and selective execution
* Improved test data management

## 👨‍💻 Author

**Sachin**

QA / SDET Automation Engineer

### Skills Demonstrated

* Playwright
* TypeScript
* JavaScript
* Test Automation
* Page Object Model
* End-to-End Testing
* API Testing
* CI/CD
* Git & GitHub

## 📄 License

This project is intended for learning, demonstration, and portfolio purposes.
