/**
 * Votes on a recording with the specified vote type.
 * @param request - An object containing the recording ID.
 * @param type - The type of vote, either "up" or "down".
 * @returns A promise that resolves with the result of the vote operation.
 * @throws {Error} If the user session ID is not found, the request is invalid, or an error occurs during the API call.
 */
export declare const vote: (request?: any, type?: string) => Promise<import("./apiClient").ApiResponse<any>>;
/**
 * Fetches the vote record for a given request and user session ID.
 * @param request - An object containing the request ID.
 * @returns A promise that resolves with the result of the vote record fetch operation.
 * @throws {Error} If an error occurs during the API call.
 */
export declare const getVoteRecord: (request?: any) => Promise<any>;
//# sourceMappingURL=UserVote.d.ts.map