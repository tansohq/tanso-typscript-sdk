import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { TansoClient } from "../../src/index.js";
import {
  TansoNotFoundError,
  TansoConflictError,
  TansoAuthenticationError,
} from "../../src/index.js";
import {
  mockResponse,
  successEnvelope,
  errorEnvelope,
  setupFetchMock,
} from "../helpers.js";

describe("SubscriptionsResource", () => {
  let client: TansoClient;
  let mockFetch: ReturnType<typeof setupFetchMock>;

  beforeEach(() => {
    mockFetch = setupFetchMock();
    client = new TansoClient("sk_test_abc123");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const subscribedCustomerResponse = {
    subscription: {
      id: "sub_1",
      isActive: true,
      intervalMonths: "1",
      plan: { id: "plan_1", name: "Basic" },
    },
    invoice: {
      id: "inv_1",
      createdAt: "2026-01-01T00:00:00Z",
      modifiedAt: "2026-01-01T00:00:00Z",
      amount: 29.99,
      dueDate: "2026-02-01T00:00:00Z",
      currency: "USD",
      status: "DUE",
    },
  };

  describe("create", () => {
    it("should create a subscription and return SubscribedCustomerResponse", async () => {
      mockFetch.mockResolvedValueOnce(
        mockResponse(200, successEnvelope(subscribedCustomerResponse))
      );

      const result = await client.subscriptions.create({
        customerReferenceId: "ext_1",
        planId: "plan_1",
      });

      expect(result.subscription.id).toBe("sub_1");
      expect(result.subscription.isActive).toBe(true);
      expect(result.invoice.id).toBe("inv_1");
      const [url, options] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(url).toBe(
        "https://sandbox.api.tansoflow.com/api/v1/client/subscriptions"
      );
      expect(options.method).toBe("POST");
      expect(JSON.parse(options.body as string)).toEqual({
        customerReferenceId: "ext_1",
        planId: "plan_1",
      });
    });
  });

  describe("cancel", () => {
    it("should cancel a subscription (void return) with default mode", async () => {
      mockFetch.mockResolvedValueOnce(
        mockResponse(200, successEnvelope(null))
      );

      const result = await client.subscriptions.cancel("sub_1");

      expect(result).toBeUndefined();
      const [url] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(url).toContain("/cancellation/sub_1");
      expect(url).toContain("cancelMode=END_OF_PERIOD");
    });

    it("should cancel a subscription immediately", async () => {
      mockFetch.mockResolvedValueOnce(
        mockResponse(200, successEnvelope(null))
      );

      await client.subscriptions.cancel("sub_1", "IMMEDIATE");

      const [url] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(url).toContain("cancelMode=IMMEDIATE");
    });
  });

  describe("revertCancellation", () => {
    it("should revert a scheduled cancellation (void return)", async () => {
      mockFetch.mockResolvedValueOnce(
        mockResponse(200, successEnvelope(null))
      );

      const result = await client.subscriptions.revertCancellation("sub_1");

      expect(result).toBeUndefined();
      const [url, options] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(url).toBe(
        "https://sandbox.api.tansoflow.com/api/v1/client/subscriptions/cancellation/sub_1/scheduled"
      );
      expect(options.method).toBe("DELETE");
    });
  });

  describe("changePlan", () => {
    it("should change the plan (void return)", async () => {
      mockFetch.mockResolvedValueOnce(
        mockResponse(200, successEnvelope(null))
      );

      const result = await client.subscriptions.changePlan("sub_1", {
        changeToPlanId: "plan_2",
        changeType: "UPGRADE",
      });

      expect(result).toBeUndefined();
      const [url, options] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(url).toBe(
        "https://sandbox.api.tansoflow.com/api/v1/client/subscriptions/sub_1/plan-change"
      );
      expect(options.method).toBe("POST");
      expect(JSON.parse(options.body as string)).toEqual({
        changeToPlanId: "plan_2",
        changeType: "UPGRADE",
      });
    });
  });

  describe("cancelScheduledChange", () => {
    it("should cancel a scheduled plan change (void return)", async () => {
      mockFetch.mockResolvedValueOnce(
        mockResponse(200, successEnvelope(null))
      );

      await client.subscriptions.cancelScheduledChange("sub_1");

      const [url, options] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(url).toBe(
        "https://sandbox.api.tansoflow.com/api/v1/client/subscriptions/sub_1/plan-change/scheduled"
      );
      expect(options.method).toBe("DELETE");
    });
  });

  describe("error handling", () => {
    it("should throw TansoNotFoundError on 404", async () => {
      mockFetch.mockResolvedValueOnce(
        mockResponse(404, errorEnvelope("Subscription not found"))
      );

      await expect(client.subscriptions.cancel("bad_id")).rejects.toThrow(
        TansoNotFoundError
      );
    });

    it("should throw TansoAuthenticationError on 401", async () => {
      mockFetch.mockResolvedValueOnce(
        mockResponse(401, errorEnvelope("Unauthorized"))
      );

      await expect(
        client.subscriptions.create({
          customerReferenceId: "ext_1",
          planId: "plan_1",
        })
      ).rejects.toThrow(TansoAuthenticationError);
    });

    it("should throw TansoConflictError on 409", async () => {
      mockFetch.mockResolvedValueOnce(
        mockResponse(409, errorEnvelope("Subscription already exists"))
      );

      await expect(
        client.subscriptions.create({
          customerReferenceId: "ext_1",
          planId: "plan_1",
        })
      ).rejects.toThrow(TansoConflictError);
    });
  });
});
