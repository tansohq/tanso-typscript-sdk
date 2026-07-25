"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsResource = void 0;
const BASE_PATH = "/api/v1/client/events";
class EventsResource {
    http;
    constructor(http) {
        this.http = http;
    }
    /**
     * Ingest a usage event.
     */
    async ingest(params) {
        const body = {
            ...params,
            occurredAt: params.occurredAt ?? new Date().toISOString(),
        };
        const headers = {};
        if (params.eventIdempotencyKey) {
            headers["X-Idempotency-Key"] = params.eventIdempotencyKey;
        }
        return this.http.post(BASE_PATH, body, { headers });
    }
}
exports.EventsResource = EventsResource;
//# sourceMappingURL=events.js.map