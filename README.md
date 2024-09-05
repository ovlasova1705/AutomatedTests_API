# 🎭 Automated API Testing with Playwright

Welcome to **Automated API Tests** using Playwright and TypeScript! 
🚀 This project demonstrates how to write reliable, atomic API tests with Playwright. 

## 📑 Project Overview

This repository contains a set of API tests for managing users via the [DemoQA API](https://demoqa.com/swagger/#/Account). Here's what is covered:

- **Create User**: `POST` request to create a new user.
- **Authenticate User**: `POST` request to authenticate a user and generate a token.
- **Delete User**: `DELETE` request to delete an authenticated user.

Each test is atomic and can be run independently. The project is designed for scalability and ease of integration into CI/CD pipelines.

## 🧪 Key Features

### 🔄 Continuous Integration with GitHub Actions
Every time you push code, GitHub Actions kicks in to run the tests automatically. The workflow file is set up to:
- Install dependencies
- Run Playwright tests
- Generate and upload **Allure Reports**
- Send notifications to Telegram

### 🖥️ Allure Reports
We integrate [Allure](https://docs.qameta.io/allure/) to provide beautiful, detailed reports for every test run. 📊 You can view:
- Test statuses (passed, failed, skipped)
- Test durations
- Detailed logs with request/response data

### 💬 Telegram Notifications
After each test run, the results are sent directly to a Telegram chat, so you’re always in the loop about what’s going on with your tests. 

