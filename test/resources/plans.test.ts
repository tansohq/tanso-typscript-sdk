import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { TansoClient } from "../../src/index.js";
import { TansoAuthenticationError } from "../../src/index.js";
import {
  mockResponse,
  successEnvelope,
  errorEnvelope,
  setupFetchMock,
} from "../helpers.js";

describe("PlansResource", () => {
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
    it("should list plans with default pagination", async () => {
      const data = {
        items: [{
          plan: { id: "plan_1", key: "basic", name: "Basic", description: "", priceAmount: 29.99, currency: "USD", intervalMonths: 1, billingTiming: "ADVANCE" },
          features: [],
        }],
        pagination: { total: 1, limit: 50, offset: 0, hasMore: false },
      };
      mockFetch.mockResolvedValueOnce(
        mockResponse(200, successEnvelope(data))
      );

      const result = await client.plans.list();

      expect(result).toEqual(data);
      const [url, options] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(url).toBe(
        "https://sandbox.api.tansoflow.com/api/v1/client/plans"
      );
      expect(options.method).toBe("GET");
    });

    it("should pass pagination params", async () => {
      const data = {
        items: [],
        pagination: { total: 0, limit: 10, offset: 5, hasMore: false },
      };
      mockFetch.mockResolvedValueOnce(
        mockResponse(200, successEnvelope(data))
      );

      await client.plans.list(10, 5);

      const [url] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(url).toContain("limit=10");
      expect(url).toContain("offset=5");
    });

    it("should throw TansoAuthenticationError on 401", async () => {
      mockFetch.mockResolvedValueOnce(
        mockResponse(401, errorEnvelope("Unauthorized"))
      );

      await expect(client.plans.list()).rejects.toThrow(
        TansoAuthenticationError
      );
    });
  });
});
