"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TansoNetworkError = exports.TansoConflictError = exports.TansoNotFoundError = exports.TansoAuthenticationError = exports.TansoApiError = exports.TansoError = exports.TansoClient = void 0;
// Client
var client_js_1 = require("./client.js");
Object.defineProperty(exports, "TansoClient", { enumerable: true, get: function () { return client_js_1.TansoClient; } });
// Errors
var errors_js_1 = require("./errors.js");
Object.defineProperty(exports, "TansoError", { enumerable: true, get: function () { return errors_js_1.TansoError; } });
Object.defineProperty(exports, "TansoApiError", { enumerable: true, get: function () { return errors_js_1.TansoApiError; } });
Object.defineProperty(exports, "TansoAuthenticationError", { enumerable: true, get: function () { return errors_js_1.TansoAuthenticationError; } });
Object.defineProperty(exports, "TansoNotFoundError", { enumerable: true, get: function () { return errors_js_1.TansoNotFoundError; } });
Object.defineProperty(exports, "TansoConflictError", { enumerable: true, get: function () { return errors_js_1.TansoConflictError; } });
Object.defineProperty(exports, "TansoNetworkError", { enumerable: true, get: function () { return errors_js_1.TansoNetworkError; } });
//# sourceMappingURL=index.js.map