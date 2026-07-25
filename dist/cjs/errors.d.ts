/**
 * Base error class for all Tanso SDK errors.
 */
export declare class TansoError extends Error {
    constructor(message: string);
}
/**
 * Error returned when the Tanso API responds with an error status code.
 */
export declare class TansoApiError extends TansoError {
    readonly statusCode: number;
    readonly detail?: string;
    constructor(message: string, statusCode: number, detail?: string);
}
/**
 * Error returned when the API responds with 401 Unauthorized.
 */
export declare class TansoAuthenticationError extends TansoApiError {
    constructor(message: string, detail?: string);
}
/**
 * Error returned when the API responds with 404 Not Found.
 */
export declare class TansoNotFoundError extends TansoApiError {
    constructor(message: string, detail?: string);
}
/**
 * Error returned when the API responds with 409 Conflict.
 */
export declare class TansoConflictError extends TansoApiError {
    constructor(message: string, detail?: string);
}
/**
 * Error returned when a network error occurs (connection refused, timeout, etc.).
 */
export declare class TansoNetworkError extends TansoError {
    readonly cause?: Error;
    constructor(message: string, cause?: Error);
}
//# sourceMappingURL=errors.d.ts.map