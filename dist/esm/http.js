import { TansoApiError, TansoAuthenticationError, TansoConflictError, TansoNetworkError, TansoNotFoundError, } from "./errors.js";
const SDK_VERSION = "0.1.0";
export class HttpClient {
    apiKey;
    baseUrl;
    constructor(options) {
        this.apiKey = options.apiKey;
        this.baseUrl = options.baseUrl.replace(/\/+$/, "");
    }
    getHeaders(extra) {
        return {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
            "User-Agent": `tanso-sdk-typescript/${SDK_VERSION}`,
            ...extra,
        };
    }
    buildUrl(path, params) {
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
    async handleResponse(response) {
        let body;
        try {
            body = (await response.json());
        }
        catch {
            throw new TansoApiError(`Unexpected response format (status ${response.status})`, response.status);
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
        return body.data;
    }
    async get(path, params) {
        const url = this.buildUrl(path, params);
        let response;
        try {
            response = await fetch(url, {
                method: "GET",
                headers: this.getHeaders(),
            });
        }
        catch (err) {
            throw new TansoNetworkError(`Network error: ${err instanceof Error ? err.message : String(err)}`, err instanceof Error ? err : undefined);
        }
        return this.handleResponse(response);
    }
    async post(path, body, options) {
        const url = this.buildUrl(path, options?.params);
        let response;
        try {
            response = await fetch(url, {
                method: "POST",
                headers: this.getHeaders(options?.headers),
                body: body !== undefined ? JSON.stringify(body) : undefined,
            });
        }
        catch (err) {
            throw new TansoNetworkError(`Network error: ${err instanceof Error ? err.message : String(err)}`, err instanceof Error ? err : undefined);
        }
        return this.handleResponse(response);
    }
    async patch(path, body) {
        const url = this.buildUrl(path);
        let response;
        try {
            response = await fetch(url, {
                method: "PATCH",
                headers: this.getHeaders(),
                body: JSON.stringify(body),
            });
        }
        catch (err) {
            throw new TansoNetworkError(`Network error: ${err instanceof Error ? err.message : String(err)}`, err instanceof Error ? err : undefined);
        }
        return this.handleResponse(response);
    }
    async delete(path) {
        const url = this.buildUrl(path);
        let response;
        try {
            response = await fetch(url, {
                method: "DELETE",
                headers: this.getHeaders(),
            });
        }
        catch (err) {
            throw new TansoNetworkError(`Network error: ${err instanceof Error ? err.message : String(err)}`, err instanceof Error ? err : undefined);
        }
        return this.handleResponse(response);
    }
}
//# sourceMappingURL=http.js.map