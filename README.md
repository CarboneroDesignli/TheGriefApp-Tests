The Grief App - Mobile Automation Framework 📱
Professional End-to-End (E2E) automation suite for The Grief App (Android), built using WebdriverIO, Appium, and TypeScript with a robust Screen Object Model (SOM) architecture.

🚀 Overview
This framework is engineered for scalability and maintainability, utilizing Mocha as the test runner to validate critical user journeys. The current implementation focuses on the core authentication and onboarding flows.

🛠️ Tech Stack
Engine: WebdriverIO v9

Driver: Appium v3 (UiAutomator2)

Language: TypeScript

Framework: Mocha

Design Pattern: Screen Object Model (SOM)

📁 Project Structure
tests/specs/: Test definitions and execution logic (e.g., login.e2e.ts).

tests/screenobjects/: Encapsulated UI elements and interactions for specific screens.

tests/helpers/: Utility classes for WebView handling, biometrics, and common actions.

config/: Environment-specific configuration files for Android and local Appium execution.

🚦 Getting Started
Prerequisites
Node.js (v18 or higher)

Android SDK & Platform Tools

Appium Server

A running Android Emulator or Physical Device

Installation
Clone the repository:

Bash

git clone https://github.com/CarboneroDesignli/TGAAutomation.git
Install dependencies:

Bash

npm install
Environment Setup: Create a .env file in the root directory and define your test credentials:

Code snippet

TEST_USER_EMAIL=your_email@example.com
TEST_USER_PASS=your_password
Running Tests
To execute the Android application tests locally:

Bash

npm run android.app


📝 Current Test Coverage
Authentication Flow:

[x] Welcome Screen "Get Started" interaction.

[x] Secure Login with environment-based credentials.

[x] System-level "Push Notifications" permission handling.

👤 Author
Marlon - QA Engineer
