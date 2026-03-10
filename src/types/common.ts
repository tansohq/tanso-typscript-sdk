/**
 * Standard API response envelope.
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    detail?: string;
  };
}

/**
 * Paginated list response.
 */
export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

/**
 * Pagination parameters.
 */
export interface PaginationParams {
  limit?: number;
  offset?: number;
}
