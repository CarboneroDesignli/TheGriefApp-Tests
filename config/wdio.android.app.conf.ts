import * as dotenv from 'dotenv';
import * as os from 'node:os';
import * as path from 'node:path';
import { config as baseConfig } from './wdio.shared.local.appium.conf';

dotenv.config({ path: path.join(process.cwd(), '.env') });

if (!process.env.ANDROID_HOME) {
    const homeDir = os.homedir();
    if (process.platform === 'win32') {
        process.env.ANDROID_HOME = path.join(homeDir, 'AppData', 'Local', 'Android', 'Sdk');
    } else {
        process.env.ANDROID_HOME = path.join(homeDir, 'Library', 'Android', 'sdk');
    }
    process.env.ANDROID_SDK_ROOT = process.env.ANDROID_HOME;
}

export const config: WebdriverIO.Config = {
    ...baseConfig,

    maxInstances: 1,

    // ============
    // Cucumber
    // ============
    framework: 'cucumber',

    specs: [
        path.join(process.cwd(), 'features/**/*.feature'),
    ],

    cucumberOpts: {
        require: [
            path.join(process.cwd(), 'features/step-definitions/**/*.ts'),
        ],
        timeout: 180000,
    },

    // ============
    // Capabilities
    // ============
    capabilities: [
        {
            platformName: 'Android',
            'appium:automationName': 'UiAutomator2',
            'appium:deviceName': 'Samsung A55',
            'appium:udid': 'R5CXA3M1FAF',
            'appium:orientation': 'PORTRAIT',

            'appium:appPackage': 'com.thegriefapp.qa',
            'appium:appActivity': 'com.thegriefapp.MainActivity',

            'appium:noReset': false,
            'appium:fullReset': false,

            'appium:newCommandTimeout': 300,
        },
    ],
};
