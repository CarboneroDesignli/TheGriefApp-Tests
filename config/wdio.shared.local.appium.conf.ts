import { config as baseConfig } from './wdio.shared.conf.js';

export const config: WebdriverIO.Config = {
    ...baseConfig,
    
    // Indica dónde corre tu Appium manual
    port: 4723, 
    path: '/', 

    specs: [
        '../tests/specs/**/*.ts'
    ],

    capabilities: [
        {
            platformName: 'Android',
            'appium:automationName': 'UiAutomator2',
            'appium:deviceName': 'Samsung_A55',
            'appium:appPackage': "com.thegriefapp.qa",
            'appium:appActivity': ".MainActivity",
            'appium:noReset': true,
        }
    ],

    services: [
        ...baseConfig.services || [],
        // [                       <--- COMENTA ESTO
        //     'appium',           <--- COMENTA ESTO
        //     {                   <--- COMENTA ESTO
        //         args: { ... }   <--- COMENTA ESTO
        //     },                  <--- COMENTA ESTO
        // ],                      <--- COMENTA ESTO
    ],
    
    
    before: async ()=> {
        if (driver.isAndroid){
            await driver.updateSettings({
                waitForSelectorTimeout: 3 * 1000
            });
        }
    }
};