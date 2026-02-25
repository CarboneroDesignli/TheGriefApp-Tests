import type { Options } from '@wdio/types';

export const config: Options.Testrunner = {
    // ====================
    // Runner Configuration
    // ====================
    logLevel: 'warn', 
    bail: 0,
    waitforTimeout: 45000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    // ===================
    // Test Configurations
    // ===================
    framework: 'cucumber',

    // Combined Reporters List
    reporters: [
        'spec', 
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: false,
            useCucumberStepReporter: true 
        }]
    ],

    /**
     * Global Cucumber options.
     */
    cucumberOpts: {
        backtrace: false,
        requireModule: [],
        failAmbiguousDefinitions: false,
        ignoreUndefinedDefinitions: false,
        names: [],
        snippets: true,
        source: true,
        strict: false,
        tags: 'not @skip',
        timeout: 180000, 
        ignoreStepDefinitionSkipped: false
    },

// ===================
    // Hooks
    // ===================

    /**
     * Captures a screenshot after every failed Cucumber step.
     */
    afterStep: async function (step, scenario, { error }) {
        if (error) {
            await driver.takeScreenshot();
        }
    },

    /**
     * Captures a screenshot at the very end of every scenario (Passed or Failed).
     */
    afterScenario: async function (world, result) {
        // This ensures you always have a visual record of the final state.
        await driver.takeScreenshot();
    }
};