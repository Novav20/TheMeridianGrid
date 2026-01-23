/**
 * Interface: ApiResponse
 * Purpose: A standardized envelope for all API responses.
 * @template T The type of the data payload.
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
