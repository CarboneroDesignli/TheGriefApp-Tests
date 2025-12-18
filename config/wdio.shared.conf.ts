import type { Options } from '@wdio/types';

/**
 * Shared configuration for all environments.
 * Specific platform configurations (Android/iOS) will inherit from this object.
 */
export const config: Options.Testrunner = {
    // ====================
    // Runner Configuration
    // ====================
    /**
     * Level of logging verbosity. 
     * Set to 'warn' to prevent 'no such element' retry logs from cluttering the terminal.
     */
    logLevel: 'warn', 
    bail: 0,
    waitforTimeout: 45000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    // ===================
    // Test Configurations
    // ===================
    /**
     * Use Cucumber as the test framework. 
     * Shared reporters like 'spec' will be used across all platforms.
     */
    framework: 'cucumber',
    reporters: ['spec'],

    /**
     * Global Cucumber options.
     * These can be overridden in platform-specific configuration files.
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
        /**
         * 'tags' replaces the deprecated 'tagExpression'.
         * Default to skip scenarios marked with @skip.
         */
        tags: 'not @skip',
        timeout: 180000, // 3-minute timeout for mobile stability
        ignoreStepDefinitionSkipped: false
    }
};