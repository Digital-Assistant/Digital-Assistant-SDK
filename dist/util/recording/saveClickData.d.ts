/**
 * Saves click data for a given node to be sent to a REST service.
 * This function processes the clicked node, extracts relevant information,
 * and formats it into a structured object suitable for recording user interactions.
 *
 * @param node The clicked HTML element.
 * @param text The text content or label associated with the clicked element.
 * @param meta The metadata associated with the clicked element, including system-detected properties.
 * @returns A promise that resolves to the formatted click data object.
 * @throws Error if required parameters are missing.
 */
export declare const saveClickData: (node: any, text: string, meta: any) => Promise<false | {
    domain: string;
    urlpath: string;
    clickednodename: string;
    html5: number;
    clickedpath: string;
    objectdata: string;
}>;
//# sourceMappingURL=saveClickData.d.ts.map