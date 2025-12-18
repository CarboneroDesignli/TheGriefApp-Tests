import * as dotenv from 'dotenv';
import * as os from 'node:os';
import * as path from 'node:path';
import { config as baseConfig } from './wdio.shared.local.appium.conf';

dotenv.config({ path: path.join(process.cwd(), '.env') });

/**
 * Environment logic to automatically locate the Android SDK path 
 * if the ANDROID_HOME variable is not explicitly set.
 */
if (!process.env.ANDROID_HOME) {
    const homeDir = os.homedir();
    process.env.ANDROID_HOME = process.platform === 'win32' 
        ? path.join(homeDir, 'AppData', 'Local', 'Android', 'Sdk')
        : path.join(homeDir, 'Library', 'Android', 'sdk');
    process.env.ANDROID_SDK_ROOT = process.env.ANDROID_HOME;
}

export const config: WebdriverIO.Config = {
    ...baseConfig,

    maxInstances: 1,

    /**
     * Define the location of feature files. 
     * These are specific to the Cucumber framework implementation.
     */
    specs: [
        path.join(process.cwd(), 'features/**/*.feature'),
    ],

    /**
     * Extend global Cucumber options from the shared configuration 
     * and specify the path for step definition files.
     */
    cucumberOpts: {
        ...baseConfig.cucumberOpts,
        require: [
            path.join(process.cwd(), 'features/step-definitions/**/*.ts'),
        ],
    },

    /**
     * Clean definition of Android-specific capabilities.
     * Prioritize UDID and package details for reliable device targeting.
     */
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