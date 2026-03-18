/**
 * Records user click data for analytics and tracking
 * @param clickType - Type of click event (default: "sequencerecord")
 * @param clickedName - Name of the clicked element
 * @param recordId - Associated record ID
 */
export declare const recordUserClickData: (clickType?: string, clickedName?: string, recordId?: number) => Promise<any>;
/**
 * Sends user click event data to the server
 * @param payload - Click event payload
 */
export declare const userClick: (payload: any) => Promise<any>;
//# sourceMappingURL=trackingService.d.ts.map