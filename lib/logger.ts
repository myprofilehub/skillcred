/**
 * Production-safe logging utility
 * Only logs in development mode unless explicitly forced
 */

const isDev = process.env.NODE_ENV !== 'production';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

function createLogger(prefix: string) {
    const log = (level: LogLevel, ...args: unknown[]) => {
        if (level === 'error') {
            console.error(`[${prefix}]`, ...args);
        } else if (level === 'warn') {
            console.warn(`[${prefix}]`, ...args);
        } else if (isDev) {
            if (level === 'debug') {
                console.log(`[${prefix}:DEBUG]`, ...args);
            } else {
                console.log(`[${prefix}]`, ...args);
            }
        }
    };

    return {
        debug: (...args: unknown[]) => log('debug', ...args),
        info: (...args: unknown[]) => log('info', ...args),
        warn: (...args: unknown[]) => log('warn', ...args),
        error: (...args: unknown[]) => log('error', ...args),
    };
}

// Pre-configured loggers for common areas
export const authLogger = createLogger('AUTH');
export const apiLogger = createLogger('API');
export const dbLogger = createLogger('DB');

// Generic logger factory
export const logger = createLogger('APP');
export { createLogger };
