import type { Options } from '@wdio/types';

/**
 * Shared configuration for all environments.
 * Specific platform configurations (Android/iOS) will inherit from this object.
 */
export const config: Options.Testrunner = {
    // ====================
    // Runner Configuration
    // ====================
    logLevel: 'debug',
    bail: 0,
    waitforTimeout: 45000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    // ===================
    // Test Configurations
    // ===================
    framework: 'mocha',
    reporters: ['spec'],

    // Options to be passed to Mocha.
    mochaOpts: {
        ui: 'bdd',
        timeout: 180000, // 3 minutes for stability 
    }
};