/**
 * Form Validation Utilities
 * Framework-agnostic validation functions for form inputs
 */
export interface ValidationResult {
    isValid: boolean;
    error?: string;
}
/**
 * Validate step name input
 * Rules:
 * - Cannot be empty or only whitespace
 * - Maximum length: 100 characters
 *
 * @param value - The step name to validate
 * @returns ValidationResult object with isValid flag and optional error message
 */
export declare const validateStepName: (value: string) => ValidationResult;
/**
 * Validate tooltip input
 * Rules:
 * - Must have content (not empty)
 * - Maximum length: 100 characters
 *
 * @param value - The tooltip text to validate
 * @returns ValidationResult object with isValid flag and optional error message
 */
export declare const validateTooltip: (value: string) => ValidationResult;
/**
 * Validate delay time input
 * Rules:
 * - Must be a valid number
 * - Must be non-negative
 * - Maximum value: 10000 milliseconds
 *
 * @param value - The delay time to validate (can be string or number)
 * @returns ValidationResult object with isValid flag and optional error message
 */
export declare const validateDelayTime: (value: number | string) => ValidationResult;
/**
 * Generic input validator used by RecordedData component
 * Rules:
 * - Maximum length: 100 characters
 * - Must match regex pattern: alphanumeric, spaces, dots, hyphens, underscores
 *
 * @param value - The input value to validate
 * @returns boolean indicating if input is valid
 */
export declare const validateInput: (value: string) => boolean;
/**
 * Validate custom metadata input
 * Rules:
 * - Cannot be empty
 * - Maximum length: 200 characters
 *
 * @param value - The metadata value to validate
 * @returns ValidationResult object with isValid flag and optional error message
 */
export declare const validateCustomMetadata: (value: string) => ValidationResult;
//# sourceMappingURL=formValidators.d.ts.map