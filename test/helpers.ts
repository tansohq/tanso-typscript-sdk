import { vi } from "vitest";
import type { ApiResponse } from "../src/types/common.js";

/**
 * Creates a mock Response object for fetch.
 */
export function mockResponse<T>(
  status: number,
  body: ApiResponse<T>
): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: "",
    headers: new Headers(),
    redirected: false,
    type: "basic" as ResponseType,
    url: "",
    clone: () => ({} as Response),
    body: null,
    bodyUsed: false,
    arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
    blob: () => Promise.resolve(new Blob()),
    formData: () => Promise.resolve(new FormData()),
    text: () => Promise.resolve(JSON.stringify(body)),
    json: () => Promise.resolve(body),
    bytes: () => Promise.resolve(new Uint8Array()),
  } as Response;
}

/**
 * Creates a success response envelope.
 */
export function successEnvelope<T>(data: T): ApiResponse<T> {
  return { success: true, data };
}

/**
 * Creates an error response envelope.
 */
export function errorEnvelope(
  message: string,
  detail?: string
): ApiResponse<never> {
  return { success: false, error: { message, detail } };
}

/**
 * Sets up a mock fetch that captures and returns call info.
 */
export function setupFetchMock() {
  const mockFetch = vi.fn<(...args: unknown[]) => Promise<Response>>();
  vi.stubGlobal("fetch", mockFetch);
  return mockFetch;
}
