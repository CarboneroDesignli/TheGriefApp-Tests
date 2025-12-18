import type { Options } from '@wdio/types';

/**
 * Configuración compartida para todos los entornos.
 * Las configuraciones específicas de plataforma (Android/iOS) heredarán de este objeto.
 */
export const config: Options.Testrunner = {
    // ====================
    // Runner Configuration
    // ====================
    logLevel: 'info', // Cambiado de 'debug' a 'info' para reducir ruido en logs, a menos que estés depurando
    bail: 0,
    waitforTimeout: 45000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    // ===================
    // Test Configurations
    // ===================
    // Unificamos el framework a Cucumber para evitar conflictos con Mocha
    framework: 'cucumber',
    reporters: ['spec'],

    // Configuraciones globales de Cucumber
    // Estas se pueden sobreescribir en archivos específicos si es necesario
    cucumberOpts: {
        backtrace: false,
        requireModule: [],
        failAmbiguousDefinitions: false,
        ignoreUndefinedDefinitions: false,
        names: [],
        snippets: true,
        source: true,
        strict: false,
        tagExpression: 'not @skip',
        timeout: 180000, // 3 minutos para estabilidad en pruebas móviles
        ignoreStepDefinitionSkipped: false
    }
};