import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { TansoClient } from "../../src/index.js";
import {
  TansoAuthenticationError,
  TansoConflictError,
} from "../../src/index.js";
import {
  mockResponse,
  successEnvelope,
  errorEnvelope,
  setupFetchMock,
} from "../helpers.js";

describe("EventsResource", () => {
  let client: TansoClient;
  let mockFetch: ReturnType<typeof setupFetchMock>;

  beforeEach(() => {
    mockFetch = setupFetchMock();
    client = new TansoClient("sk_test_abc123");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("ingest", () => {
    it("should ingest an event and return EventIngestionResponse", async () => {
      const response = { usageLimitExceeded: false, message: "accepted" };
      mockFetch.mockResolvedValueOnce(
        mockResponse(200, successEnvelope(response))
      );

      const result = await client.events.ingest({
        customerReferenceId: "cust_1",
        eventName: "api_call",
        usageUnits: 1,
        eventIdempotencyKey: "idem_1",
      });

      expect(result).toEqual(response);
      const [url, options] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(url).toBe(
        "https://sandbox.api.tansoflow.com/api/v1/client/events"
      );
      expect(options.method).toBe("POST");
      const body = JSON.parse(options.body as string);
      expect(body.customerReferenceId).toBe("cust_1");
      expect(body.eventName).toBe("api_call");
      expect(body.usageUnits).toBe(1);
      expect(body.occurredAt).toBeDefined();
    });

    it("should include idempotency key header when provided", async () => {
      const response = { usageLimitExceeded: false };
      mockFetch.mockResolvedValueOnce(
        mockResponse(200, successEnvelope(response))
      );

      await client.events.ingest({
        customerReferenceId: "cust_1",
        eventName: "api_call",
        usageUnits: 5,
        eventIdempotencyKey: "idem_123",
      });

      const [, options] = mockFetch.mock.calls[0] as [string, RequestInit];
      const headers = options.headers as Record<string, string>;
      expect(headers["X-Idempotency-Key"]).toBe("idem_123");
    });

    it("should include meta and optional fields", async () => {
      const response = { usageLimitExceeded: false };
      mockFetch.mockResolvedValueOnce(
        mockResponse(200, successEnvelope(response))
      );

      await client.events.ingest({
        customerReferenceId: "cust_1",
        eventName: "api_call",
        usageUnits: 1,
        eventIdempotencyKey: "idem_1",
        meta: { source: "sdk" },
        featureKey: "api_access",
      });

      const [, options] = mockFetch.mock.calls[0] as [string, RequestInit];
      const body = JSON.parse(options.body as string);
      expect(body.meta).toEqual({ source: "sdk" });
      expect(body.featureKey).toBe("api_access");
    });

    it("should auto-set occurredAt when not provided", async () => {
      const response = { usageLimitExceeded: false };
      mockFetch.mockResolvedValueOnce(
        mockResponse(200, successEnvelope(response))
      );

      await client.events.ingest({
        customerReferenceId: "cust_1",
        eventName: "api_call",
        usageUnits: 1,
        eventIdempotencyKey: "idem_1",
      });

      const [, options] = mockFetch.mock.calls[0] as [string, RequestInit];
      const body = JSON.parse(options.body as string);
      expect(body.occurredAt).toBeDefined();
      expect(typeof body.occurredAt).toBe("string");
    });

    it("should use provided occurredAt when given", async () => {
      const response = { usageLimitExceeded: false };
      mockFetch.mockResolvedValueOnce(
        mockResponse(200, successEnvelope(response))
      );

      const timestamp = "2026-01-01T00:00:00.000Z";
      await client.events.ingest({
        customerReferenceId: "cust_1",
        eventName: "api_call",
        usageUnits: 1,
        eventIdempotencyKey: "idem_1",
        occurredAt: timestamp,
      });

      const [, options] = mockFetch.mock.calls[0] as [string, RequestInit];
      const body = JSON.parse(options.body as string);
      expect(body.occurredAt).toBe(timestamp);
    });

    it("should include revenueAmount in request body when provided", async () => {
      const response = { usageLimitExceeded: false };
      mockFetch.mockResolvedValueOnce(
        mockResponse(200, successEnvelope(response))
      );

      await client.events.ingest({
        customerReferenceId: "cust_1",
        eventName: "api_call",
        eventIdempotencyKey: "idem_1",
        revenueAmount: 1.50,
      });

      const [, options] = mockFetch.mock.calls[0] as [string, RequestInit];
      const body = JSON.parse(options.body as string);
      expect(body.revenueAmount).toBe(1.50);
    });

    it("should include costInput in request body when provided", async () => {
      const response = { usageLimitExceeded: false };
      mockFetch.mockResolvedValueOnce(
        mockResponse(200, successEnvelope(response))
      );

      await client.events.ingest({
        customerReferenceId: "cust_1",
        eventName: "llm_call",
        eventIdempotencyKey: "idem_1",
        costInput: { model: "gpt-4", modelProvider: "openai", costUnits: 150 },
      });

      const [, options] = mockFetch.mock.calls[0] as [string, RequestInit];
      const body = JSON.parse(options.body as string);
      expect(body.costInput).toEqual({
        model: "gpt-4",
        modelProvider: "openai",
        costUnits: 150,
      });
    });

    it("should include inputTokens and outputTokens in costInput when provided", async () => {
      const response = { usageLimitExceeded: false };
      mockFetch.mockResolvedValueOnce(
        mockResponse(200, successEnvelope(response))
      );

      await client.events.ingest({
        customerReferenceId: "cust_1",
        eventName: "llm_call",
        eventIdempotencyKey: "idem_1",
        costInput: {
          model: "gpt-4",
          modelProvider: "openai",
          inputTokens: 3000,
          outputTokens: 500,
        },
      });

      const [, options] = mockFetch.mock.calls[0] as [string, RequestInit];
      const body = JSON.parse(options.body as string);
      expect(body.costInput).toEqual({
        model: "gpt-4",
        modelProvider: "openai",
        inputTokens: 3000,
        outputTokens: 500,
      });
    });

    it("should include costAmount in request body when provided", async () => {
      const response = { usageLimitExceeded: false };
      mockFetch.mockResolvedValueOnce(
        mockResponse(200, successEnvelope(response))
      );

      await client.events.ingest({
        customerReferenceId: "cust_1",
        eventName: "api_call",
        usageUnits: 1,
        eventIdempotencyKey: "idem_1",
        costAmount: 0.05,
      });

      const [, options] = mockFetch.mock.calls[0] as [string, RequestInit];
      const body = JSON.parse(options.body as string);
      expect(body.costAmount).toBe(0.05);
    });

    it("should throw TansoAuthenticationError on 401", async () => {
      mockFetch.mockResolvedValueOnce(
        mockResponse(401, errorEnvelope("Unauthorized"))
      );

      await expect(
        client.events.ingest({
          customerReferenceId: "cust_1",
          eventName: "api_call",
          usageUnits: 1,
          eventIdempotencyKey: "idem_1",
        })
      ).rejects.toThrow(TansoAuthenticationError);
    });

    it("should throw TansoConflictError on 409", async () => {
      mockFetch.mockResolvedValueOnce(
        mockResponse(409, errorEnvelope("Duplicate event"))
      );

      await expect(
        client.events.ingest({
          customerReferenceId: "cust_1",
          eventName: "api_call",
          usageUnits: 1,
          eventIdempotencyKey: "dup_key",
        })
      ).rejects.toThrow(TansoConflictError);
    });
  });
});
