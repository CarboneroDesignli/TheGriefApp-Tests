import * as dotenv from 'dotenv';
import * as os from 'node:os';
import * as path from 'node:path';
import { config as baseConfig } from './wdio.shared.local.appium.conf';

dotenv.config({ path: path.join(process.cwd(), '.env') });

// Lógica de entorno para Android SDK
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

    // Las Specs se definen aquí por ser específicas de Cucumber
    specs: [
        path.join(process.cwd(), 'features/**/*.feature'),
    ],

    // Extendemos las opciones de Cucumber del archivo compartido
    cucumberOpts: {
        ...baseConfig.cucumberOpts,
        require: [
            path.join(process.cwd(), 'features/step-definitions/**/*.ts'),
        ],
    },

    // Definición limpia de capacidades para Android
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