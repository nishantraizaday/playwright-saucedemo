# Playwright Automation Framework – SauceDemo

![Playwright Tests](https://github.com/nishantraizaday/playwright-saucedemo/actions/workflows/playwright.yml/badge.svg)


🚀 **End-to-End Test Automation Framework** built using **Playwright + JavaScript** following **Page Object Model (POM)** design principles.

This project demonstrates real-world automation testing skills including UI automation, test structuring, fixtures, reusable helpers, and CI integration.

---

## 🛠 Technologies Used

- **Playwright**
- JavaScript (ES Modules)
- Node.js
- GitHub Actions (CI/CD)
- Page Object Model (POM)
- Playwright Fixtures
- Custom Test Helpers
- HTML Test Reporting

---

## 📁 Project Structure

```
playwright-saucedemo/
│
├─ tests/
│ ├─ fixtures/
│ │ └─ authFixture.js
│ ├─ helpers/
│ │ ├─ cartHelper.js
│ │ ├─ checkoutHelper.js
│ │ └─ priceHelper.js
│ ├─ cart.spec.js
│ ├─ checkout.spec.js
│ └─ products.spec.js
│
├─ pages/
│ ├─ cartPage.js
│ ├─ checkoutPage.js
│ ├─ loginPage.js
│ └─ productsPage.js
│
├─ .gitignore
├─ package.json
├─ package-lock.json
└─ README.md
```

---

## 🎯 Features Implemented

### ✔ Authentication Handling
- Login automation using **Playwright Fixtures**
- Reusable authenticated session for all tests

### ✔ Cart Functionality Testing
- Add single and multiple products to cart  
- Remove items dynamically  
- Validate cart badge count  
- Assert empty cart behavior  
- Verify UI updates after actions  

### ✔ Checkout Flow Automation
- End-to-end checkout process  
- Form validation  
- Negative scenarios  
- Success message verification  

### ✔ Price Validation
- Extract product prices dynamically  
- Validate item total calculations  
- Validate tax and final total  
- Custom helper functions for price assertions  

### ✔ Reusability and Maintainability
- Page Object Model structure  
- Reusable helpers  
- Clean test separation (Arrange-Act-Assert)  
- Minimal test duplication  

### ✔ CI Integration
- Automated test execution using **GitHub Actions**
- HTML report generation

---

## 🧪 Sample Test Scenarios

Some of the automated scenarios:

- User login validation  
- Add items to cart  
- Remove items from cart  
- Empty cart validation  
- Checkout process validation  
- Price calculations validation  
- Error handling during checkout  

---

## 🚀 How to Run the Project Locally

### Prerequisites

- Node.js (v16+)
- Git
- VS Code (recommended)

---

### 1️⃣ Clone the Repository

git clone <your-repo-url>
cd playwright-saucedemo

### 2️⃣ Install Dependencies
npm install

### 3️⃣ Install Playwright Browsers
npx playwright install

### 4️⃣ Run All Tests
npx playwright test

### 5️⃣ Open Test Report
npx playwright show-report

### 6️⃣ Run Tests in UI Mode
npx playwright test --ui

🧩 Key Design Decisions
Page Object Model

Each major page of the application has its own class:

ProductsPage

CartPage

CheckoutPage

This keeps selectors and actions centralized and reusable.

Fixtures for Authentication

Instead of logging in repeatedly in every test file, a custom fixture:

authFixture.js


handles login once and provides a ready-to-use logged-in page.

Helpers for Reusability

Common actions like:

Adding items to cart

Emptying cart

Completing checkout

Price summation

are moved into reusable helper modules.

🔁 CI/CD Integration

The project includes a GitHub Actions workflow that automatically:

Installs dependencies

Runs all Playwright tests

Uploads test reports

Located at:

.github/workflows/playwright.yml

📈 What This Project Demonstrates

This framework showcases my ability to:

Build scalable automation frameworks

Implement clean test architecture

Follow automation best practices

Write maintainable and reusable code

Integrate automation with CI pipelines

👤 Author

Nishant Raizaday

QA Automation Engineer
Portfolio Project for demonstrating Playwright automation expertise.

📄 License

This project is for educational and portfolio purposes.

