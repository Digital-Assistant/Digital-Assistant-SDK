/**
 * This module exports a configuration array that defines various HTML form elements
 * and their corresponding system tags and display names. This is used for categorizing
 * and identifying interactive elements during the recording process.
 */
/**
 * Returns a static array of configurations for various HTML form elements.
 * Each object in the array describes an input type, its display name, and a system tag
 * for internal identification. This data is used to map clicked DOM elements
 * to a standardized representation.
 *
 * @returns An array of objects, each representing a type of HTML form element.
 */
export declare const fetchHtmlFormElements: () => ({
    inputElement: string;
    inputType: string[];
    displayName: string;
    systemTag: string;
} | {
    inputElement: string;
    inputType: string;
    displayName: string;
    systemTag: string;
} | {
    inputElement: string[];
    inputType: string;
    displayName: string;
    systemTag: string;
} | {
    inputElement: string[];
    inputType: string[];
    displayName: string;
    systemTag: string;
})[];
export default fetchHtmlFormElements;
//# sourceMappingURL=fetchHtmlFormElements.d.ts.map