/**
 * Search request interface
 */
export interface SearchRequest {
    keyword?: string;
    page: number;
    domain?: string;
    additionalParams?: any;
    usersessionid?: string;
}
/**
 * Record fetch request interface
 */
export interface RecordRequest {
    id?: string;
    domain?: string;
    additionalParams?: any;
    usersessionid?: string;
}
/**
 * Fetches search results from the backend with error handling
 * @param request - Search request parameters
 * @returns Promise that resolves to the search results
 */
export declare const fetchSearchResults: (request?: SearchRequest) => Promise<any>;
/**
 * Fetch a record from the backend with optional additional parameters and error handling
 * @param request - Record fetch request parameters
 * @returns Promise that resolves to the fetched record
 */
export declare const fetchRecord: (request?: RecordRequest) => Promise<any>;
/**
 * Fetch special nodes processing from backend with error handling
 * @param request - Optional parameters for the special nodes request
 * @returns Promise that resolves to the fetched special nodes
 */
export declare const fetchSpecialNodes: (request?: any) => Promise<any>;
//# sourceMappingURL=SearchService.d.ts.map