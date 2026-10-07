/**
 * Configuration options for the API client
 */
export interface ApiClientConfig {
    baseURL?: string;
    timeout?: number;
    additionalHeaders?: Record<string, string>;
}
/**
 * Response wrapper for API calls
 */
export interface ApiResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
}
/**
 * Error structure for API errors
 */
export interface ApiError {
    message: string;
    status?: number;
    code?: string;
    data?: any;
}
/**
 * Central API Client for Digital Assistant SDK
 *
 * This class provides a centralized HTTP client with automatic JWT authentication
 * for all internal SDK services. It reads the JWT token from the Redux store
 * and attaches it to every outgoing request.
 *
 * Features:
 * - Automatic JWT token attachment from centralized state
 * - Request/Response interceptors for authentication
 * - Error handling for 401 responses
 * - Environment-aware base URL configuration
 * - TypeScript support with proper type definitions
 *
 * Usage:
 * ```typescript
 * import { apiClient } from '@digital-assistant/core';
 *
 * // Make authenticated requests
 * const response = await apiClient.get('/api/user/profile');
 * const data = await apiClient.post('/api/data', { payload });
 * ```
 */
export declare class ApiClient {
    private axiosInstance;
    private config;
    constructor(config?: ApiClientConfig);
    /**
     * Setup request interceptor to automatically attach JWT token and realm headers
     * Matches the original getHTTPHeaders functionality from UI services
     */
    private setupRequestInterceptor;
    /**
     * Setup response interceptor for error handling
     */
    private setupResponseInterceptor;
    /**
     * Handle 401 Unauthorized errors
     * This could trigger token refresh or logout depending on SDK configuration
     */
    private handleUnauthorizedError;
    /**
     * Update the base URL for the API client
     */
    updateBaseURL(baseURL: string): void;
    /**
     * Update additional headers
     */
    updateHeaders(headers: Record<string, string>): void;
    /**
     * Generic GET request
     */
    get<T = any>(url: string, config?: any): Promise<ApiResponse<T>>;
    /**
     * Generic POST request
     */
    post<T = any>(url: string, data?: any, config?: any): Promise<ApiResponse<T>>;
    /**
     * Generic PUT request
     */
    put<T = any>(url: string, data?: any, config?: any): Promise<ApiResponse<T>>;
    /**
     * Generic PATCH request
     */
    patch<T = any>(url: string, data?: any, config?: any): Promise<ApiResponse<T>>;
    /**
     * Generic DELETE request
     */
    delete<T = any>(url: string, config?: any): Promise<ApiResponse<T>>;
    /**
     * Get the underlying Axios instance for advanced usage
     */
    getAxiosInstance(): any;
    /**
     * Mock method to simulate fetching special nodes
     */
    fetchSpecialNodes(): Promise<any>;
    /**
     * Get current configuration
     */
    getConfig(): ApiClientConfig;
}
export declare const apiClient: ApiClient;
export default ApiClient;
//# sourceMappingURL=apiClient.d.ts.map