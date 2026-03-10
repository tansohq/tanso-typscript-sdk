import type { HttpClient } from "../http.js";
import type { EventIngestionResponse, IngestEventParams } from "../types/events.js";

const BASE_PATH = "/api/v1/client/events";

export class EventsResource {
  constructor(private readonly http: HttpClient) {}

  /**
   * Ingest a usage event.
   */
  async ingest(params: IngestEventParams): Promise<EventIngestionResponse> {
    const body = {
      ...params,
      occurredAt: params.occurredAt ?? new Date().toISOString(),
    };

    const headers: Record<string, string> = {};
    if (params.eventIdempotencyKey) {
      headers["X-Idempotency-Key"] = params.eventIdempotencyKey;
    }
    return this.http.post<EventIngestionResponse>(BASE_PATH, body, { headers });
  }
}
