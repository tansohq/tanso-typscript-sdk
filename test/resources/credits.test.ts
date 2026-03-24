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

describe("CreditsResource", () => {
  let client: TansoClient;
  let mockFetch: ReturnType<typeof setupFetchMock>;

  beforeEach(() => {
    mockFetch = setupFetchMock();
    client = new TansoClient("sk_test_abc123");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("listPools", () => {
    it("should list credit pools for a customer", async () => {
      const data = {
        items: [{
          id: "pool_1",
          name: "API Credits",
          denomination: "credits",
          balance: 1000,
          totalGranted: 1500,
          totalConsumed: 500,
          totalExpired: 0,
          totalReversed: 0,
          status: "ACTIVE",
        }],
        pagination: { total: 1, limit: 50, offset: 0, hasMore: false },
      };
      mockFetch.mockResolvedValueOnce(
        mockResponse(200, successEnvelope(data))
      );

      const result = await client.credits.listPools("cust_1");

      expect(result).toEqual(data);
      const [url, options] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(url).toBe(
        "https://sandbox.api.tansoflow.com/api/v1/client/credits/cust_1/pools"
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

      await client.credits.listPools("cust_1", 10, 5);

      const [url] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(url).toContain("limit=10");
      expect(url).toContain("offset=5");
    });
  });

  describe("getPool", () => {
    it("should get a specific credit pool", async () => {
      const pool = {
        id: "pool_1",
        name: "API Credits",
        denomination: "credits",
        balance: 1000,
        totalGranted: 1500,
        totalConsumed: 500,
        totalExpired: 0,
        totalReversed: 0,
        status: "ACTIVE",
      };
      mockFetch.mockResolvedValueOnce(
        mockResponse(200, successEnvelope(pool))
      );

      const result = await client.credits.getPool("cust_1", "pool_1");

      expect(result).toEqual(pool);
      const [url, options] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(url).toBe(
        "https://sandbox.api.tansoflow.com/api/v1/client/credits/cust_1/pools/pool_1"
      );
      expect(options.method).toBe("GET");
    });

    it("should throw TansoNotFoundError on 404", async () => {
      mockFetch.mockResolvedValueOnce(
        mockResponse(404, errorEnvelope("Credit pool not found"))
      );

      await expect(client.credits.getPool("cust_1", "bad_id")).rejects.toThrow(
        TansoNotFoundError
      );
    });
  });

  describe("listTransactions", () => {
    it("should list transactions for a credit pool", async () => {
      const data = {
        items: [{
          id: "txn_1",
          creditPoolId: "pool_1",
          transactionType: "DEBIT",
          amount: 10,
          balanceBefore: 1000,
          balanceAfter: 990,
        }],
        pagination: { total: 1, limit: 50, offset: 0, hasMore: false },
      };
      mockFetch.mockResolvedValueOnce(
        mockResponse(200, successEnvelope(data))
      );

      const result = await client.credits.listTransactions("cust_1", "pool_1");

      expect(result).toEqual(data);
      const [url, options] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(url).toBe(
        "https://sandbox.api.tansoflow.com/api/v1/client/credits/cust_1/pools/pool_1/transactions"
      );
      expect(options.method).toBe("GET");
    });

    it("should pass pagination params", async () => {
      const data = {
        items: [],
        pagination: { total: 0, limit: 25, offset: 50, hasMore: false },
      };
      mockFetch.mockResolvedValueOnce(
        mockResponse(200, successEnvelope(data))
      );

      await client.credits.listTransactions("cust_1", "pool_1", 25, 50);

      const [url] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(url).toContain("limit=25");
      expect(url).toContain("offset=50");
    });
  });

  describe("listGrants", () => {
    it("should list grants for a credit pool", async () => {
      const data = {
        items: [{
          id: "grant_1",
          creditPoolId: "pool_1",
          grantType: "SUBSCRIPTION",
          amount: 500,
          remaining: 300,
        }],
        pagination: { total: 1, limit: 50, offset: 0, hasMore: false },
      };
      mockFetch.mockResolvedValueOnce(
        mockResponse(200, successEnvelope(data))
      );

      const result = await client.credits.listGrants("cust_1", "pool_1");

      expect(result).toEqual(data);
      const [url, options] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(url).toBe(
        "https://sandbox.api.tansoflow.com/api/v1/client/credits/cust_1/pools/pool_1/grants"
      );
      expect(options.method).toBe("GET");
    });

    it("should pass pagination params", async () => {
      const data = {
        items: [],
        pagination: { total: 0, limit: 20, offset: 10, hasMore: false },
      };
      mockFetch.mockResolvedValueOnce(
        mockResponse(200, successEnvelope(data))
      );

      await client.credits.listGrants("cust_1", "pool_1", 20, 10);

      const [url] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(url).toContain("limit=20");
      expect(url).toContain("offset=10");
    });
  });

  describe("error handling", () => {
    it("should throw TansoAuthenticationError on 401", async () => {
      mockFetch.mockResolvedValueOnce(
        mockResponse(401, errorEnvelope("Unauthorized"))
      );

      await expect(client.credits.listPools("cust_1")).rejects.toThrow(
        TansoAuthenticationError
      );
    });
  });
});
