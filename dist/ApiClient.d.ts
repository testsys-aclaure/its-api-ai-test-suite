interface APIResponse<T = any> {
    status: number;
    headers: Record<string, string>;
    json?: T;
    text?: string;
}
export declare class ApiClient {
    private env;
    private tokenCache;
    private debug;
    constructor();
    private loadEnvironment;
    private getAccessToken;
    raw(path: string, options?: RequestInit & {
        query?: Record<string, any>;
    }): Promise<APIResponse>;
    channelInstitutions_query(options?: {
        query?: Record<string, any>;
    }): Promise<APIResponse>;
    dispose(): Promise<void>;
}
export {};
//# sourceMappingURL=ApiClient.d.ts.map