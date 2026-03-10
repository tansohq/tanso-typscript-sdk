import {
  TansoApiError,
  TansoAuthenticationError,
  TansoConflictError,
  TansoNetworkError,
  TansoNotFoundError,
} from "./errors.js";
import type { ApiResponse } from "./types/common.js";

const SDK_VERSION = "0.1.0";

export interface HttpClientOptions {
  apiKey: string;
  baseUrl: string;
}

export class HttpClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(options: HttpClientOptions) {
    this.apiKey = options.apiKey;
    this.baseUrl = options.baseUrl.replace(/\/+$/, "");
  }

  private getHeaders(extra?: Record<string, string>): Record<string, string> {
    return {
      Authorization: `Bearer ${this.apiKey}`,
      "Content-Type": "application/json",
      "User-Agent": `tanso-sdk-typescript/${SDK_VERSION}`,
      ...extra,
    };
  }

  private buildUrl(path: string, params?: Record<string, string | number | undefined>): string {
    const url = new URL(`${this.baseUrl}${path}`);
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) {
          url.searchParams.set(key, String(value));
        }
      }
    }
    return url.toString();
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    let body: ApiResponse<T>;

    try {
      body = (await response.json()) as ApiResponse<T>;
    } catch {
      throw new TansoApiError(
        `Unexpected response format (status ${response.status})`,
        response.status
      );
    }

    if (!response.ok || !body.success) {
      const message = body.error?.message ?? `API error (status ${response.status})`;
      const detail = body.error?.detail;

      switch (response.status) {
        case 401:
          throw new TansoAuthenticationError(message, detail);
        case 404:
          throw new TansoNotFoundError(message, detail);
        case 409:
          throw new TansoConflictError(message, detail);
        default:
          throw new TansoApiError(message, response.status, detail);
      }
    }

    return body.data as T;
  }

  async get<T>(path: string, params?: Record<string, string | number | undefined>): Promise<T> {
    const url = this.buildUrl(path, params);
    let response: Response;

    try {
      response = await fetch(url, {
        method: "GET",
        headers: this.getHeaders(),
      });
    } catch (err) {
      throw new TansoNetworkError(
        `Network error: ${err instanceof Error ? err.message : String(err)}`,
        err instanceof Error ? err : undefined
      );
    }

    return this.handleResponse<T>(response);
  }

  async post<T>(
    path: string,
    body?: unknown,
    options?: {
      params?: Record<string, string | number | undefined>;
      headers?: Record<string, string>;
    }
  ): Promise<T> {
    const url = this.buildUrl(path, options?.params);
    let response: Response;

    try {
      response = await fetch(url, {
        method: "POST",
        headers: this.getHeaders(options?.headers),
        body: body !== undefined ? JSON.stringify(body) : undefined,
      });
    } catch (err) {
      throw new TansoNetworkError(
        `Network error: ${err instanceof Error ? err.message : String(err)}`,
        err instanceof Error ? err : undefined
      );
    }

    return this.handleResponse<T>(response);
  }

  async patch<T>(path: string, body: unknown): Promise<T> {
    const url = this.buildUrl(path);
    let response: Response;

    try {
      response = await fetch(url, {
        method: "PATCH",
        headers: this.getHeaders(),
        body: JSON.stringify(body),
      });
    } catch (err) {
      throw new TansoNetworkError(
        `Network error: ${err instanceof Error ? err.message : String(err)}`,
        err instanceof Error ? err : undefined
      );
    }

    return this.handleResponse<T>(response);
  }

  async delete<T>(path: string): Promise<T> {
    const url = this.buildUrl(path);
    let response: Response;

    try {
      response = await fetch(url, {
        method: "DELETE",
        headers: this.getHeaders(),
      });
    } catch (err) {
      throw new TansoNetworkError(
        `Network error: ${err instanceof Error ? err.message : String(err)}`,
        err instanceof Error ? err : undefined
      );
    }

    return this.handleResponse<T>(response);
  }
}
