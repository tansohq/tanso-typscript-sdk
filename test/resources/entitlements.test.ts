import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { TansoClient } from "../../src/index.js";
import {
  TansoNotFoundError,
  TansoAuthenticationError,
} from "../../src/index.js";
import {
  mockResponse,
  successEnvelope,
  errorEnvelope,
  setupFetchMock,
} from "../helpers.js";

describe("EntitlementsResource", () => {
  let client: TansoClient;
  let mockFetch: ReturnType<typeof setupFetchMock>;

  beforeEach(() => {
    mockFetch = setupFetchMock();
    client = new TansoClient("sk_test_abc123");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("list", () => {
    it("should list entitlements for a customer", async () => {
      const data = {
        items: [{
          subscriptionId: "sub_1",
          entitlements: [{ featureKey: "feature_1", allowed: true }],
        }],
        pagination: { total: 1, limit: 50, offset: 0, hasMore: false },
      };
      mockFetch.mockResolvedValueOnce(
        mockResponse(200, successEnvelope(data))
      );

      const result = await client.entitlements.list("cust_1");

      expect(result).toEqual(data);
      const [url] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(url).toBe(
        "https://sandbox.api.tansoflow.com/api/v1/client/entitlements/cust_1"
      );
    });

    it("should pass pagination params", async () => {
      const data = {
        items: [],
        pagination: { total: 0, limit: 20, offset: 10, hasMore: false },
      };
      mockFetch.mockResolvedValueOnce(
        mockResponse(200, successEnvelope(data))
      );

      await client.entitlements.list("cust_1", 20, 10);

      const [url] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(url).toContain("limit=20");
      expect(url).toContain("offset=10");
    });
  });

  describe("check", () => {
    it("should check a single entitlement and return EntitlementEvaluation", async () => {
      const evaluation = {
        referenceCustomerId: "cust_1",
        featureKey: "api_access",
        allowed: true,
        flowId: "flw_123",
      };
      mockFetch.mockResolvedValueOnce(
        mockResponse(200, successEnvelope(evaluation))
      );

      const result = await client.entitlements.check("cust_1", "api_access");

      expect(result).toEqual(evaluation);
      expect(result.referenceCustomerId).toBe("cust_1");
      expect(result.allowed).toBe(true);
      const [url] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(url).toBe(
        "https://sandbox.api.tansoflow.com/api/v1/client/entitlements/cust_1/api_access"
      );
    });

    it("should pass record=false query param when specified", async () => {
      const evaluation = {
        referenceCustomerId: "cust_1",
        featureKey: "api_access",
        allowed: true,
        flowId: "flw_123",
      };
      mockFetch.mockResolvedValueOnce(
        mockResponse(200, successEnvelope(evaluation))
      );

      await client.entitlements.check("cust_1", "api_access", false);

      const [url] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(url).toContain("record=false");
    });

    it("should throw TansoNotFoundError on 404", async () => {
      mockFetch.mockResolvedValueOnce(
        mockResponse(404, errorEnvelope("Entitlement not found"))
      );

      await expect(
        client.entitlements.check("cust_1", "nonexistent")
      ).rejects.toThrow(TansoNotFoundError);
    });
  });

  describe("evaluate", () => {
    it("should evaluate an entitlement with usage simulation", async () => {
      const evaluation = {
        referenceCustomerId: "cust_1",
        allowed: true,
        featureKey: "api_calls",
        flowId: "flw_456",
      };
      mockFetch.mockResolvedValueOnce(
        mockResponse(200, successEnvelope(evaluation))
      );

      const result = await client.entitlements.evaluate({
        customerReferenceId: "cust_1",
        featureKey: "api_calls",
        usage: { usageUnits: 100, eventName: "api_call" },
        context: { idempotencyKey: "idem_1" },
      });

      expect(result).toEqual(evaluation);
      const [url, options] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(url).toBe(
        "https://sandbox.api.tansoflow.com/api/v1/client/entitlements"
      );
      expect(options.method).toBe("POST");
      expect(JSON.parse(options.body as string)).toEqual({
        customerReferenceId: "cust_1",
        featureKey: "api_calls",
        usage: { usageUnits: 100, eventName: "api_call" },
        context: { idempotencyKey: "idem_1" },
      });
    });
  });

  describe("error handling", () => {
    it("should throw TansoAuthenticationError on 401", async () => {
      mockFetch.mockResolvedValueOnce(
        mockResponse(401, errorEnvelope("Unauthorized"))
      );

      await expect(client.entitlements.list("cust_1")).rejects.toThrow(
        TansoAuthenticationError
      );
    });
  });
});
