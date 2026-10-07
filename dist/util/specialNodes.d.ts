/**
 * This configuration object defines various categories of "special nodes" used for identifying
 * and handling specific DOM elements during recording, playback, and other utility operations.
 * These definitions help in resolving issues related to unwanted clicks, comparisons, and event attachments.
 */
export declare const specialNodes: {
    /**
     * List of nodes to explicitly include for attaching events.
     * Events will be attached to elements matching these criteria.
     */
    include: {
        tags: string[];
        classes: string[];
        attributes: string[];
    };
    /**
     * List of nodes to explicitly exclude from attaching events.
     * Events will NOT be attached to elements matching these criteria.
     */
    exclude: {
        tags: string[];
        classes: string[];
        attributes: string[];
        ids: string[];
    };
    /**
     * Nodes whose children should be ignored when attaching event listeners.
     * This is useful for complex components where only the parent should be interactive.
     */
    ignoreChildren: {
        tags: string[];
        classes: string[];
        attributes: string[];
    };
    /**
     * Nodes on which clicks should be ignored.
     * This is used to prevent recording clicks on certain interactive elements that are not relevant.
     */
    ignoreClicksOnNodes: {
        tags: string[];
        classes: string[];
        attributes: string[];
        ids: string[];
    };
    /**
     * List of attributes to ignore when comparing nodes during playback.
     * This helps in making node comparisons more robust by disregarding dynamic or irrelevant attributes.
     */
    ignoreDuringCompare: {
        tags: never[];
        classes: never[];
        attributes: string[];
        ids: never[];
    };
    /**
     * Attributes to ignore specifically for "personal" nodes during comparison.
     * These attributes often contain user-specific or dynamic data that should not affect node matching.
     */
    personalNodeIgnoreAttributes: string[];
    /**
     * Identifiers for text editor elements.
     * Used to recognize and handle text editors specifically (e.g., for tooltip messages).
     */
    textEditors: {
        tags: string[];
        classes: string[];
        attributes: never[];
    };
    /**
     * Identifiers for dropdown elements.
     * Used to recognize and handle dropdowns specifically.
     */
    dropDowns: {
        tags: string[];
        classes: string[];
        attributes: never[];
    };
    /**
     * Identifiers for date picker elements.
     * Used to recognize and handle date pickers specifically.
     */
    datePicker: {
        tags: string[];
        classes: string[];
        attributes: string[];
    };
    /**
     * List of special nodes that should generally not be recorded or interacted with in a standard way.
     */
    specialNodes: {
        tags: string[];
        classes: string[];
        attributes: never[];
    };
    /**
     * Elements for which default event prevention should be considered (e.g., preventing default link behavior).
     */
    preventDefault: {
        tags: string[];
        classes: never[];
        attributes: string[];
    };
    /**
     * Identifiers for icon elements.
     * Used to recognize icons, which might be treated as "personal" nodes during recording.
     */
    iconNodes: {
        tags: string[];
        classes: never[];
        attributes: never[];
    };
};
//# sourceMappingURL=specialNodes.d.ts.map