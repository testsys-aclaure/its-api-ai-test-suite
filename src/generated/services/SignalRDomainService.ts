/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { QuerySignalRDomainQueryResponse } from '../models/QuerySignalRDomainQueryResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SignalRDomainService {
    /**
     * /signalr-domain/query
     * Returns the configured SignalR hostname.
     * @returns QuerySignalRDomainQueryResponse OK
     * @throws ApiError
     */
    public static signalRDomainQuery(): CancelablePromise<QuerySignalRDomainQueryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/signalr-domain/query',
        });
    }
}
