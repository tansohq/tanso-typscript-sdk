import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { TansoClient } from "../../src/index.js";
import {
  TansoAuthenticationError,
  TansoNotFoundError,
  TansoConflictError,
} from "../../src/index.js";
import {
  mockResponse,
  successEnvelope,
  errorEnvelope,
  setupFetchMock,
} from "../helpers.js";

describe("CustomersResource", () => {
  let client: TansoClient;
  let mockFetch: ReturnType<typeof setupFetchMock>;

  beforeEach(() => {
    mockFetch = setupFetchMock();
    client = new TansoClient("sk_test_abc123");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("create", () => {
    it("should create a customer", async () => {
      const customer = {
        customerReferenceId: "ext_1",
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
      };
      mockFetch.mockResolvedValueOnce(
        mockResponse(200, successEnvelope(customer))
      );

      const result = await client.customers.create({
        customerReferenceId: "ext_1",
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
      });

      expect(result).toEqual(customer);
      expect(mockFetch).toHaveBeenCalledOnce();

      const [url, options] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(url).toBe(
        "https://sandbox.api.tansoflow.com/api/v1/client/customers"
      );
      expect(options.method).toBe("POST");
      expect(options.headers).toMatchObject({
        Authorization: "Bearer sk_test_abc123",
        "Content-Type": "application/json",
      });
      expect(JSON.parse(options.body as string)).toEqual({
        customerReferenceId: "ext_1",
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
      });
    });
  });

  describe("get", () => {
    it("should get a customer by reference ID", async () => {
      const customer = {
        customerReferenceId: "ext_1",
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
      };
      mockFetch.mockResolvedValueOnce(
        mockResponse(200, successEnvelope(customer))
      );

      const result = await client.customers.get("ext_1");

      expect(result).toEqual(customer);
      const [url, options] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(url).toBe(
        "https://sandbox.api.tansoflow.com/api/v1/client/customers/ext_1"
      );
      expect(options.method).toBe("GET");
    });

    it("should throw TansoNotFoundError on 404", async () => {
      mockFetch.mockResolvedValueOnce(
        mockResponse(404, errorEnvelope("Customer not found"))
      );

      await expect(client.customers.get("nonexistent")).rejects.toThrow(
        TansoNotFoundError
      );
    });
  });

  describe("update", () => {
    it("should update a customer", async () => {
      const updated = {
        customerReferenceId: "ext_1",
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@example.com",
      };
      mockFetch.mockResolvedValueOnce(
        mockResponse(200, successEnvelope(updated))
      );

      const result = await client.customers.update("ext_1", {
        firstName: "Jane",
        email: "jane@example.com",
      });

      expect(result).toEqual(updated);
      const [url, options] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(url).toBe(
        "https://sandbox.api.tansoflow.com/api/v1/client/customers/ext_1"
      );
      expect(options.method).toBe("PATCH");
      expect(JSON.parse(options.body as string)).toEqual({
        firstName: "Jane",
        email: "jane@example.com",
      });
    });
  });

  describe("error handling", () => {
    it("should throw TansoAuthenticationError on 401", async () => {
      mockFetch.mockResolvedValueOnce(
        mockResponse(401, errorEnvelope("Invalid API key", "Check your key"))
      );

      const err = await client.customers
        .get("ext_1")
        .catch((e: unknown) => e);
      expect(err).toBeInstanceOf(TansoAuthenticationError);
      expect((err as TansoAuthenticationError).statusCode).toBe(401);
      expect((err as TansoAuthenticationError).message).toBe("Invalid API key");
      expect((err as TansoAuthenticationError).detail).toBe("Check your key");
    });

    it("should throw TansoConflictError on 409", async () => {
      mockFetch.mockResolvedValueOnce(
        mockResponse(409, errorEnvelope("Customer already exists"))
      );

      await expect(
        client.customers.create({
          customerReferenceId: "ext_1",
          email: "john@example.com",
        })
      ).rejects.toThrow(TansoConflictError);
    });
  });
});
