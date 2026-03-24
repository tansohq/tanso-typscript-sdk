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

describe("FeaturesResource", () => {
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
    it("should list features with default pagination", async () => {
      const data = {
        items: [{
          id: "feat_1",
          name: "API Access",
          key: "api_access",
          description: "Access to the API",
          isEnabled: true,
        }],
        pagination: { total: 1, limit: 50, offset: 0, hasMore: false },
      };
      mockFetch.mockResolvedValueOnce(
        mockResponse(200, successEnvelope(data))
      );

      const result = await client.features.list();

      expect(result).toEqual(data);
      const [url, options] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(url).toBe(
        "https://sandbox.api.tansoflow.com/api/v1/client/features"
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

      await client.features.list(10, 5);

      const [url] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(url).toContain("limit=10");
      expect(url).toContain("offset=5");
    });
  });

  describe("get", () => {
    it("should get a feature by key", async () => {
      const feature = {
        id: "feat_1",
        name: "API Access",
        key: "api_access",
        description: "Access to the API",
        isEnabled: true,
      };
      mockFetch.mockResolvedValueOnce(
        mockResponse(200, successEnvelope(feature))
      );

      const result = await client.features.get("api_access");

      expect(result).toEqual(feature);
      const [url, options] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(url).toBe(
        "https://sandbox.api.tansoflow.com/api/v1/client/features/api_access"
      );
      expect(options.method).toBe("GET");
    });

    it("should throw TansoNotFoundError on 404", async () => {
      mockFetch.mockResolvedValueOnce(
        mockResponse(404, errorEnvelope("Feature not found"))
      );

      await expect(client.features.get("nonexistent")).rejects.toThrow(
        TansoNotFoundError
      );
    });
  });

  describe("error handling", () => {
    it("should throw TansoAuthenticationError on 401", async () => {
      mockFetch.mockResolvedValueOnce(
        mockResponse(401, errorEnvelope("Unauthorized"))
      );

      await expect(client.features.list()).rejects.toThrow(
        TansoAuthenticationError
      );
    });
  });
});
