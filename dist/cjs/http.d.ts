export interface HttpClientOptions {
    apiKey: string;
    baseUrl: string;
}
export declare class HttpClient {
    private readonly apiKey;
    private readonly baseUrl;
    constructor(options: HttpClientOptions);
    private getHeaders;
    private buildUrl;
    private handleResponse;
    get<T>(path: string, params?: Record<string, string | number | undefined>): Promise<T>;
    post<T>(path: string, body?: unknown, options?: {
        params?: Record<string, string | number | undefined>;
        headers?: Record<string, string>;
    }): Promise<T>;
    patch<T>(path: string, body: unknown): Promise<T>;
    delete<T>(path: string): Promise<T>;
}
//# sourceMappingURL=http.d.ts.map