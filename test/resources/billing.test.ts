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

describe("BillingResource", () => {
  let client: TansoClient;
  let mockFetch: ReturnType<typeof setupFetchMock>;

  beforeEach(() => {
    mockFetch = setupFetchMock();
    client = new TansoClient("sk_test_abc123");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("listInvoices", () => {
    it("should list invoices for a customer", async () => {
      const data = {
        items: [{
          id: "inv_1",
          createdAt: "2026-01-01T00:00:00Z",
          modifiedAt: "2026-01-01T00:00:00Z",
          amount: 29.99,
          dueDate: "2026-02-01T00:00:00Z",
          currency: "USD",
          status: "DUE",
        }],
        pagination: { total: 1, limit: 50, offset: 0, hasMore: false },
      };
      mockFetch.mockResolvedValueOnce(
        mockResponse(200, successEnvelope(data))
      );

      const result = await client.billing.listInvoices("cust_1");

      expect(result).toEqual(data);
      const [url, options] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(url).toBe(
        "https://sandbox.api.tansoflow.com/api/v1/client/billing/invoices/cust_1"
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

      await client.billing.listInvoices("cust_1", 25, 50);

      const [url] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(url).toContain("limit=25");
      expect(url).toContain("offset=50");
    });
  });

  describe("markPaid", () => {
    it("should mark an invoice as paid (void return)", async () => {
      mockFetch.mockResolvedValueOnce(
        mockResponse(200, successEnvelope(null))
      );

      const result = await client.billing.markPaid("inv_1");

      expect(result).toBeUndefined();
      const [url, options] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(url).toBe(
        "https://sandbox.api.tansoflow.com/api/v1/client/billing/invoices/inv_1/mark-paid"
      );
      expect(options.method).toBe("POST");
    });

    it("should throw TansoNotFoundError on 404", async () => {
      mockFetch.mockResolvedValueOnce(
        mockResponse(404, errorEnvelope("Invoice not found"))
      );

      await expect(client.billing.markPaid("bad_id")).rejects.toThrow(
        TansoNotFoundError
      );
    });
  });

  describe("createCheckoutSession", () => {
    it("should create a checkout session", async () => {
      const session = { url: "https://checkout.stripe.com/session_123" };
      mockFetch.mockResolvedValueOnce(
        mockResponse(200, successEnvelope(session))
      );

      const result = await client.billing.createCheckoutSession("inv_1");

      expect(result).toEqual(session);
      const [url, options] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(url).toBe(
        "https://sandbox.api.tansoflow.com/api/v1/client/billing/invoices/inv_1/stripe/checkout"
      );
      expect(options.method).toBe("POST");
    });
  });

  describe("error handling", () => {
    it("should throw TansoAuthenticationError on 401", async () => {
      mockFetch.mockResolvedValueOnce(
        mockResponse(401, errorEnvelope("Unauthorized"))
      );

      await expect(client.billing.listInvoices("cust_1")).rejects.toThrow(
        TansoAuthenticationError
      );
    });
  });
});
