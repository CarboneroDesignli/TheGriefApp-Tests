import * as dotenv from 'dotenv';
import * as os from 'node:os';
import * as path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs';
import { config as baseConfig } from './wdio.shared.local.appium.conf';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const execFileAsync = promisify(execFile);

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
     * Ensure the APK is installed once before any worker sessions start.
     * This avoids session creation failures when the app isn't preinstalled.
     */
    onPrepare: async () => {
        const udid = process.env.ANDROID_UDID ?? 'emulator-5554';
        const appPackage = process.env.ANDROID_APP_PACKAGE ?? 'com.thegriefapp.qa';

        const apkRelative = process.env.ANDROID_APP_APK ?? 'apps/thegriefapp-qa.apk';
        const apkPath = path.resolve(process.cwd(), apkRelative);

        if (!fs.existsSync(apkPath)) {
            throw new Error(
                `APK not found at ${apkPath}. ` +
                'Place your APK there or set ANDROID_APP_APK to a valid relative path.'
            );
        }

        // Uninstall if installed (ignore non-zero errors when not installed)
        try {
            await execFileAsync('adb', ['-s', udid, 'uninstall', appPackage]);
        } catch {
            // ignore
        }

        // Install fresh
        await execFileAsync('adb', ['-s', udid, 'install', '-r', '-d', apkPath]);
    },

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
            'appium:deviceName': process.env.ANDROID_DEVICE_NAME ?? 'Android Emulator',
            'appium:udid': process.env.ANDROID_UDID ?? 'emulator-5554',
            'appium:orientation': 'PORTRAIT',
            'appium:appPackage': process.env.ANDROID_APP_PACKAGE ?? 'com.thegriefapp.qa',
            'appium:appActivity': 'com.thegriefapp.MainActivity',
            'appium:noReset': false,
            'appium:fullReset': false,
            'appium:newCommandTimeout': 300,
        },
    ],
};