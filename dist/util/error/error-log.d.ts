export declare const UDALogLevel = 3;
export type WinstonLevel = "error" | "warn" | "info" | "http" | "verbose" | "debug" | "silly";
export declare const UDAConsoleLogger: {
    /**
     * Logs messages using Winston, respecting the configured minimum console level.
     * Supports both Winston level strings and legacy numeric levels.
     * Numeric mapping: 1→info, 2→warn, 3→debug, 4→verbose (default is info).
     */
    info: (mes: any, levelNumber?: number) => void;
};
export declare const UDAErrorLogger: {
    /**
     * Sends error logs to the server via HTTP transport and to the console,
     * subject to the minimum log level. By design, only errors are sent to the server.
     */
    error: (message: any, exception?: any) => Promise<void>;
};
//# sourceMappingURL=error-log.d.ts.map