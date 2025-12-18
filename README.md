The Grief App - Mobile Automation Framework 📱
Professional End-to-End (E2E) automation suite for The Grief App (Android), built using WebdriverIO, Appium, and TypeScript with a robust Screen Object Model (SOM) architecture.

🚀 ## Overview This framework is engineered for scalability and maintainability, utilizing Cucumber (BDD) to bridge the gap between technical execution and business requirements. It is designed to validate critical user journeys, currently focusing on core authentication, onboarding, and system permission flows.

🛠️ ## Tech Stack

Engine: WebdriverIO v9

Driver: Appium v3 (UiAutomator2)

Language: TypeScript

Framework: Cucumber (BDD)

Assertion Library: Expect-WebdriverIO

Design Pattern: Screen Object Model (SOM)

📁 ## Project Structure

features/: Gherkin scenario definitions (.feature files).

features/step-definitions/: Glue code mapping Gherkin steps to execution logic.

tests/screenobjects/: Encapsulated UI elements and interactions for specific screens.

config/: Environment-specific configuration files (Shared, Local, Android).

🚦 ## Getting Started

Prerequisites
Node.js (v18 or higher)

Android SDK & Platform Tools (ANDROID_HOME setup)

Appium Server running locally

A running Android Emulator or Physical Device (Samsung A55 recommended)

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
🏃 Running Tests
Full Execution
To execute all Android application tests:

Bash

npm run android.app
Smoke Testing 💨
To run only the critical tests tagged with @smoke (optimized for quick validation):

Bash

npm run android.app.smoke
📝 ## Current Test Coverage

Authentication Flow:

[x] Welcome Screen "Get Started" interaction.

[x] Secure Login with environment-based credentials.

Onboarding & Permissions:

[x] Positive flow: Accepting system-level Push Notifications.

[x] Negative flow: Denying notifications (validating app-level "Maybe later").

Home Screen Validation:

[x] Assert visibility of core dashboard elements (Grief Wave, Workbook).

👤 ## Author Marlon - QA Engineer