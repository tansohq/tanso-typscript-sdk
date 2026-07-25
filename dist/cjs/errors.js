"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TansoNetworkError = exports.TansoConflictError = exports.TansoNotFoundError = exports.TansoAuthenticationError = exports.TansoApiError = exports.TansoError = void 0;
/**
 * Base error class for all Tanso SDK errors.
 */
class TansoError extends Error {
    constructor(message) {
        super(message);
        this.name = "TansoError";
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.TansoError = TansoError;
/**
 * Error returned when the Tanso API responds with an error status code.
 */
class TansoApiError extends TansoError {
    statusCode;
    detail;
    constructor(message, statusCode, detail) {
        super(message);
        this.name = "TansoApiError";
        this.statusCode = statusCode;
        this.detail = detail;
    }
}
exports.TansoApiError = TansoApiError;
/**
 * Error returned when the API responds with 401 Unauthorized.
 */
class TansoAuthenticationError extends TansoApiError {
    constructor(message, detail) {
        super(message, 401, detail);
        this.name = "TansoAuthenticationError";
    }
}
exports.TansoAuthenticationError = TansoAuthenticationError;
/**
 * Error returned when the API responds with 404 Not Found.
 */
class TansoNotFoundError extends TansoApiError {
    constructor(message, detail) {
        super(message, 404, detail);
        this.name = "TansoNotFoundError";
    }
}
exports.TansoNotFoundError = TansoNotFoundError;
/**
 * Error returned when the API responds with 409 Conflict.
 */
class TansoConflictError extends TansoApiError {
    constructor(message, detail) {
        super(message, 409, detail);
        this.name = "TansoConflictError";
    }
}
exports.TansoConflictError = TansoConflictError;
/**
 * Error returned when a network error occurs (connection refused, timeout, etc.).
 */
class TansoNetworkError extends TansoError {
    cause;
    constructor(message, cause) {
        super(message);
        this.name = "TansoNetworkError";
        this.cause = cause;
    }
}
exports.TansoNetworkError = TansoNetworkError;
//# sourceMappingURL=errors.js.map