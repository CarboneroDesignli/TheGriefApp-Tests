import * as dotenv from 'dotenv';
import * as os from 'node:os';
import * as path from 'node:path';
import { config as baseConfig } from "./wdio.shared.local.appium.conf.js";

// 1. SECURE DOTENV LOADING
// Load .env from the project root ensuring it works regardless of where the command is executed
dotenv.config({ path: path.join(process.cwd(), '.env') });

// --- AUTO-DETECT ANDROID SDK (Team Friendly) ---
// Automatically sets the ANDROID_HOME based on the OS to avoid manual configuration on each machine
if (!process.env.ANDROID_HOME) {
    const homeDir = os.homedir();
    if (process.platform === 'win32') {
        process.env.ANDROID_HOME = path.join(homeDir, 'AppData', 'Local', 'Android', 'Sdk');
    } else {
        process.env.ANDROID_HOME = path.join(homeDir, 'Library', 'Android', 'sdk');
    }
    process.env.ANDROID_SDK_ROOT = process.env.ANDROID_HOME;
}
// -----------------------------------------------

export const config: WebdriverIO.Config = {
    ...baseConfig,

    // Avoid conflicts when running on a single device/emulator
    maxInstances: 1,

    // ============
    // Specs
    // ============
    // Pattern to find test files
    specs: ["../tests/specs/**/*.ts"],

    // ============
    // Capabilities
    // ============
    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'Samsung A55',
        'appium:udid': 'R5CXA3M1FAF', 
        'appium:orientation': 'PORTRAIT',
        'appium:automationName': 'UiAutomator2',
        
        // App Settings
        'appium:appPackage': 'com.thegriefapp.qa',
        'appium:appActivity': 'com.thegriefapp.MainActivity',
        
        // --- RESET STRATEGY ---
        // false = App data is cleared before the session starts (Fresh Install simulation)
        'appium:noReset': false, 
        'appium:fullReset': false,
        
        // Command timeout increased to 5 min to allow debugging or manual interaction if needed
        'appium:newCommandTimeout': 300,
    }],
};