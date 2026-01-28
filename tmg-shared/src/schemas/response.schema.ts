/**
 * Schema: API Response
 * Purpose: Standard API response shape for all endpoints.
 * Used by both client and server for type consistency.
 */

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

/**
 * Interface: PaginatedResponse
 * Purpose: Standardized envelope for list-based responses with pagination metadata.
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
