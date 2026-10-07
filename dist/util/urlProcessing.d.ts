/**
 * Utility functions for processing URLs, including parameter substitution,
 * query parameter building, and complete URL construction.
 */
/**
 * Processes a URL template by substituting placeholders with values from a given object.
 *
 * This function replaces placeholders in the format `#key#` with corresponding values from the `request` object.
 * If a value is `null` or `undefined`, the placeholder is replaced with an empty string. All substituted values
 * are URI-encoded to ensure a valid URL.
 *
 * The function also supports redacting sensitive query parameters. If a key in the `request` object
 * has a value that is an object with `redact: true`, its corresponding query parameter in the final
 * URL will be replaced with "REDACTED".
 *
 * URL fragments (e.g., `#section`) are preserved and appended to the final URL.
 *
 * @param url The URL template containing placeholders (e.g., `/search?query=#keyword#&page=#page#`).
 * @param request An object where keys match the placeholder names in the URL.
 *   - For simple substitution, the value is a string or number (e.g., `{ keyword: 'test' }`).
 *   - For redaction, the value is an object (e.g., `{ sensitiveParam: { value: 'secret', redact: true } }`).
 * @returns The processed URL with placeholders substituted, values encoded, and specified parameters redacted.
 */
export declare const processUrlArgs: (url: string, request?: any) => string;
/**
 * Builds a query parameters string from an object.
 *
 * @param params An object containing key-value pairs for query parameters.
 * @returns The query string (without a leading '?').
 */
export declare const buildQueryParams: (params: Record<string, any>) => string;
/**
 * Combines a base URL with a path and optional query parameters to form a complete URL.
 *
 * @param baseUrl The base URL.
 * @param path The path to append to the base URL.
 * @param queryParams Optional object containing query parameters.
 * @returns The complete constructed URL.
 */
export declare const buildUrl: (baseUrl: string, path: string, queryParams?: Record<string, any>) => string;
//# sourceMappingURL=urlProcessing.d.ts.map