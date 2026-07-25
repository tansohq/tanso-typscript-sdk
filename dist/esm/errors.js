/**
 * Base error class for all Tanso SDK errors.
 */
export class TansoError extends Error {
    constructor(message) {
        super(message);
        this.name = "TansoError";
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
/**
 * Error returned when the Tanso API responds with an error status code.
 */
export class TansoApiError extends TansoError {
    statusCode;
    detail;
    constructor(message, statusCode, detail) {
        super(message);
        this.name = "TansoApiError";
        this.statusCode = statusCode;
        this.detail = detail;
    }
}
/**
 * Error returned when the API responds with 401 Unauthorized.
 */
export class TansoAuthenticationError extends TansoApiError {
    constructor(message, detail) {
        super(message, 401, detail);
        this.name = "TansoAuthenticationError";
    }
}
/**
 * Error returned when the API responds with 404 Not Found.
 */
export class TansoNotFoundError extends TansoApiError {
    constructor(message, detail) {
        super(message, 404, detail);
        this.name = "TansoNotFoundError";
    }
}
/**
 * Error returned when the API responds with 409 Conflict.
 */
export class TansoConflictError extends TansoApiError {
    constructor(message, detail) {
        super(message, 409, detail);
        this.name = "TansoConflictError";
    }
}
/**
 * Error returned when a network error occurs (connection refused, timeout, etc.).
 */
export class TansoNetworkError extends TansoError {
    cause;
    constructor(message, cause) {
        super(message);
        this.name = "TansoNetworkError";
        this.cause = cause;
    }
}
//# sourceMappingURL=errors.js.map