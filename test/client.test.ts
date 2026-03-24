import { describe, it, expect, vi, afterEach } from "vitest";
import { TansoClient, TansoError, TansoNetworkError } from "../src/index.js";
import { setupFetchMock, mockResponse, successEnvelope } from "./helpers.js";

describe("TansoClient", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should throw if no API key is provided", () => {
    expect(() => new TansoClient("")).toThrow(TansoError);
    expect(() => new TansoClient("")).toThrow("API key is required");
  });

  it("should use sandbox URL for sk_test_ keys", () => {
    const mockFetch = setupFetchMock();
    const client = new TansoClient("sk_test_key");

    const data = {
      items: [],
      pagination: { total: 0, limit: 50, offset: 0, hasMore: false },
    };
    mockFetch.mockResolvedValueOnce(mockResponse(200, successEnvelope(data)));

    client.plans.list();

    const [url] = mockFetch.mock.calls[0] as [string, RequestInit];
    expect(url).toContain("sandbox.api.tansoflow.com");
  });

  it("should use live URL for sk_live_ keys", () => {
    const mockFetch = setupFetchMock();
    const client = new TansoClient("sk_live_key");

    const data = {
      items: [],
      pagination: { total: 0, limit: 50, offset: 0, hasMore: false },
    };
    mockFetch.mockResolvedValueOnce(mockResponse(200, successEnvelope(data)));

    client.plans.list();

    const [url] = mockFetch.mock.calls[0] as [string, RequestInit];
    expect(url).toContain("api.tansoflow.com");
    expect(url).not.toContain("sandbox");
  });

  it("should allow base URL override", () => {
    const mockFetch = setupFetchMock();
    const client = new TansoClient("sk_test_key", {
      baseUrl: "https://custom.api.example.com",
    });

    const data = {
      items: [],
      pagination: { total: 0, limit: 50, offset: 0, hasMore: false },
    };
    mockFetch.mockResolvedValueOnce(mockResponse(200, successEnvelope(data)));

    client.plans.list();

    const [url] = mockFetch.mock.calls[0] as [string, RequestInit];
    expect(url).toContain("custom.api.example.com");
  });

  it("should expose all resource namespaces", () => {
    const mockFetch = setupFetchMock();
    void mockFetch; // suppress unused
    const client = new TansoClient("sk_test_key");

    expect(client.customers).toBeDefined();
    expect(client.subscriptions).toBeDefined();
    expect(client.plans).toBeDefined();
    expect(client.entitlements).toBeDefined();
    expect(client.events).toBeDefined();
    expect(client.billing).toBeDefined();
    expect(client.features).toBeDefined();
    expect(client.credits).toBeDefined();
  });

  it("should throw TansoNetworkError on fetch failure", async () => {
    const mockFetch = setupFetchMock();
    mockFetch.mockRejectedValue(new TypeError("Failed to fetch"));

    const client = new TansoClient("sk_test_key");

    await expect(client.plans.list()).rejects.toThrow(TansoNetworkError);
  });

  it("should include User-Agent header", async () => {
    const mockFetch = setupFetchMock();
    const data = {
      items: [],
      pagination: { total: 0, limit: 50, offset: 0, hasMore: false },
    };
    mockFetch.mockResolvedValueOnce(mockResponse(200, successEnvelope(data)));

    const client = new TansoClient("sk_test_key");
    await client.plans.list();

    const [, options] = mockFetch.mock.calls[0] as [string, RequestInit];
    const headers = options.headers as Record<string, string>;
    expect(headers["User-Agent"]).toBe("tanso-sdk-typescript/0.1.0");
  });

  it("should include Authorization header", async () => {
    const mockFetch = setupFetchMock();
    const data = {
      items: [],
      pagination: { total: 0, limit: 50, offset: 0, hasMore: false },
    };
    mockFetch.mockResolvedValueOnce(mockResponse(200, successEnvelope(data)));

    const client = new TansoClient("sk_test_mykey");
    await client.plans.list();

    const [, options] = mockFetch.mock.calls[0] as [string, RequestInit];
    const headers = options.headers as Record<string, string>;
    expect(headers["Authorization"]).toBe("Bearer sk_test_mykey");
  });
});
