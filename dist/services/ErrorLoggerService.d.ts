import { DigitalAssistantConfiguration } from '../DigitalAssistantConfiguration';
/**
 * A service for logging errors to a remote endpoint using Winston.
 * This service replicates the error logging functionality from the original UDAErrorLogger.
 */
export declare class ErrorLoggerService {
    private config;
    private logger;
    /**
     * Creates an instance of ErrorLoggerService.
     * @param config - The SDK configuration containing logging settings.
     */
    constructor(config: DigitalAssistantConfiguration);
    /**
     * Creates a fallback logger that outputs to the console.
     */
    private createConsoleLogger;
    /**
     * Logs an error message and an optional exception object.
     * It enriches the log message with the current user ID if available.
     *
     * @param message The primary error message.
     * @param exception An optional exception object.
     */
    error(message: string, exception?: any): void;
}
//# sourceMappingURL=ErrorLoggerService.d.ts.map