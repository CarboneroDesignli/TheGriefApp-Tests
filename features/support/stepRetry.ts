import {
    Given as originalGiven,
    When as originalWhen,
    Then as originalThen,
    Before as originalBefore,
    After as originalAfter,
    AfterStep as originalAfterStep
} from '@wdio/cucumber-framework';

const MAX_STEP_RETRIES = 3;
const RETRY_DELAY_MS = 5000;

function wrap(fn: Function) {
    return async function(this: any, ...args: any[]) {
        let lastErr: any;
        for (let attempt = 1; attempt <= MAX_STEP_RETRIES; attempt++) {
            try {
                return await fn.apply(this, args as any);
            } catch (err) {
                lastErr = err;
                if (attempt < MAX_STEP_RETRIES) {
                    // wait a bit before retrying
                    await browser.pause(RETRY_DELAY_MS);
                }
            }
        }
        throw lastErr;
    };
}

function wrapDefinition(fnOrOpts: any, maybeFn?: Function) {
    if (typeof fnOrOpts === 'function') {
        return wrap(fnOrOpts);
    }
    if (maybeFn && typeof maybeFn === 'function') {
        return [fnOrOpts, wrap(maybeFn)];
    }
    return fnOrOpts;
}

export function Given(this: any, pattern: string | RegExp, ...rest: any[]) {
    if (rest.length === 1) {
        const [fn] = rest;
        return originalGiven(pattern, wrap(fn));
    } else if (rest.length === 2) {
        const [opts, fn] = rest;
        return originalGiven(pattern, opts, wrap(fn));
    }
    // fall back to apply to satisfy TypeScript
    return (originalGiven as any).apply(this, [pattern, ...rest]);
}

export function When(this: any, pattern: string | RegExp, ...rest: any[]) {
    if (rest.length === 1) {
        const [fn] = rest;
        return originalWhen(pattern, wrap(fn));
    } else if (rest.length === 2) {
        const [opts, fn] = rest;
        return originalWhen(pattern, opts, wrap(fn));
    }
    return (originalWhen as any).apply(this, [pattern, ...rest]);
}

export function Then(this: any, pattern: string | RegExp, ...rest: any[]) {
    if (rest.length === 1) {
        const [fn] = rest;
        return originalThen(pattern, wrap(fn));
    } else if (rest.length === 2) {
        const [opts, fn] = rest;
        return originalThen(pattern, opts, wrap(fn));
    }
    return (originalThen as any).apply(this, [pattern, ...rest]);
}

// re-export other helpers unchanged
export const Before = originalBefore;
export const After = originalAfter;
export const AfterStep = originalAfterStep;
