import type { QuerySignalRDomainQueryResponse } from '../models/QuerySignalRDomainQueryResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class SignalRDomainService {
    /**
     * /signalr-domain/query
     * Returns the configured SignalR hostname.
     * @returns QuerySignalRDomainQueryResponse OK
     * @throws ApiError
     */
    static signalRDomainQuery(): CancelablePromise<QuerySignalRDomainQueryResponse>;
}
//# sourceMappingURL=SignalRDomainService.d.ts.map