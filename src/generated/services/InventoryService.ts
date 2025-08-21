/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InventoryQueryResponse } from '../models/InventoryQueryResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class InventoryService {
    /**
     * /inventory/query
     * Queries the Inventory tables for information on inventory counts.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. Sessions are linked to this institution. The web API client must have access to this institution.
     * @param orderId
     * @param programOrderId
     * @param packageCode
     * @param startOrderUtc
     * @param endOrderUtc
     * @param includeFlag
     * @returns InventoryQueryResponse OK
     * @throws ApiError
     */
    public static inventoryQuery(
        programId: number,
        programInstitutionId: string,
        orderId?: Array<number>,
        programOrderId?: Array<string>,
        packageCode?: Array<number>,
        startOrderUtc?: string,
        endOrderUtc?: string,
        includeFlag?: number,
    ): CancelablePromise<Array<InventoryQueryResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/inventory/query',
            query: {
                'program-id': programId,
                'program-institution-id': programInstitutionId,
                'order-id': orderId,
                'program-order-id': programOrderId,
                'package-code': packageCode,
                'start-order-utc': startOrderUtc,
                'end-order-utc': endOrderUtc,
                'include-flag': includeFlag,
            },
        });
    }
}
