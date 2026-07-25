import type { HttpClient } from "../http.js";
import type { EventIngestionResponse, IngestEventParams } from "../types/events.js";
export declare class EventsResource {
    private readonly http;
    constructor(http: HttpClient);
    /**
     * Ingest a usage event.
     */
    ingest(params: IngestEventParams): Promise<EventIngestionResponse>;
}
//# sourceMappingURL=events.d.ts.map