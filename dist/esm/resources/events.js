const BASE_PATH = "/api/v1/client/events";
export class EventsResource {
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
//# sourceMappingURL=events.js.map