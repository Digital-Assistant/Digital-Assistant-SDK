/**
 * StepEditingService
 * Framework-agnostic business logic for editing recording steps
 * Contains all metadata manipulation and step saving logic
 */
/**
 * TypeScript Interfaces
 */
export interface UpdateMetadataParams {
    recordData: any[];
    index: number;
    metaKey: string;
    value: any;
}
export interface SaveStepParams {
    recordData: any[];
    index: number;
    stepEditValue: string;
    isUpdateMode: boolean;
    recordingId?: number;
    slowPlaybackTime?: number;
    skipDuringPlay?: boolean;
    isPersonal?: boolean;
    tooltipInfo?: string;
}
export interface ServiceResult<T = any> {
    success: boolean;
    data?: T;
    error?: string;
}
/**
 * Validate step name and check for profanity
 *
 * @param value - The step name to validate
 * @param enableProfanityCheck - Whether profanity checking is enabled
 * @returns Promise<ServiceResult> with validation result
 */
export declare const validateStepNameWithProfanity: (value: string, enableProfanityCheck?: boolean) => Promise<ServiceResult<{
    hasProfanity: boolean;
    cleanedValue: string;
}>>;
/**
 * Update step metadata in recordData
 *
 * @param params - UpdateMetadataParams containing recordData, index, metaKey, and value
 * @returns Updated recordData array
 */
export declare const updateStepMetadata: (params: UpdateMetadataParams) => any[];
/**
 * Toggle skipDuringPlay metadata
 *
 * @param recordData - Array of recording data
 * @param index - Index of the step to update
 * @returns Updated recordData array
 */
export declare const toggleSkipDuringPlay: (recordData: any[], index: number) => any[];
/**
 * Toggle isPersonal metadata
 *
 * @param recordData - Array of recording data
 * @param index - Index of the step to update
 * @returns Updated recordData array
 */
export declare const togglePersonalInfo: (recordData: any[], index: number) => any[];
/**
 * Update tooltip metadata
 *
 * @param recordData - Array of recording data
 * @param index - Index of the step to update
 * @param tooltip - Tooltip text to set
 * @returns ServiceResult with updated recordData
 */
export declare const updateTooltipMetadata: (recordData: any[], index: number, tooltip: string) => ServiceResult<any[]>;
/**
 * Update delay time metadata
 *
 * @param recordData - Array of recording data
 * @param index - Index of the step to update
 * @param time - Delay time in milliseconds
 * @returns ServiceResult with updated recordData
 */
export declare const updateDelayTimeMetadata: (recordData: any[], index: number, time: number | string) => ServiceResult<any[]>;
/**
 * Update custom metadata (for AI features)
 *
 * @param recordData - Array of recording data
 * @param index - Index of the step to update
 * @param metaKey - The metadata key to update (e.g., 'inputType', 'inputTypeDescription')
 * @param value - The metadata value
 * @returns Updated recordData array
 */
export declare const updateCustomMetadata: (recordData: any[], index: number, metaKey: string, value: any) => any[];
/**
 * Update step type (Link/Highlight)
 *
 * @param recordData - Array of recording data
 * @param index - Index of the step to update
 * @param type - The type to set ('Link' or 'Highlight' or full element object string)
 * @returns Updated recordData array
 */
export declare const updateStepType: (recordData: any[], index: number, type: string) => any[];
/**
 * Save step changes
 * Handles both recording mode and update mode
 *
 * @param params - SaveStepParams containing all necessary data
 * @returns Promise<ServiceResult> with operation result
 */
export declare const saveStepChanges: (params: SaveStepParams) => Promise<ServiceResult>;
/**
 * Update step name in record data
 * This is used for real-time updates while editing
 *
 * @param recordData - Array of recording data
 * @param index - Index of the step to update
 * @param stepName - New step name
 * @returns Updated recordData array
 */
export declare const updateStepName: (recordData: any[], index: number, stepName: string) => any[];
//# sourceMappingURL=StepEditingService.d.ts.map