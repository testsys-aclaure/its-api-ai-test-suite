"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class OrderService {
    /**
     * /order/query
     * Retrieves details about orders.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. If supplied, all events linked to this institution or its children will be returned. The web API client must have access to this institution.
     * @param orderId The unique ITS database identifier of the order. Multiple supported.
     * @param orderCode The program-assigned, alpha-numeric identifier of the order. Multiple supported.
     * @param packageCode The program-assigned, alpha-numeric identifier of the package. Multiple supported.
     * @param orderedAfterUtc If specified, orders created on or after this date in UTC are returned. This parameter cannot be used if `ordered-before-utc` is supplied.
     * @param orderedBeforeUtc If specified, orders created on or before this date in UTC are returned. This parameter cannot be used if `ordered-after-utc` is supplied.
     * @returns Order OK
     * @throws ApiError
     */
    static orderQuery(programId, programInstitutionId, orderId, orderCode, packageCode, orderedAfterUtc, orderedBeforeUtc) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/order/Query',
            query: {
                'program-id': programId,
                'program-institution-id': programInstitutionId,
                'order-id': orderId,
                'order-code': orderCode,
                'package-code': packageCode,
                'ordered-after-utc': orderedAfterUtc,
                'ordered-before-utc': orderedBeforeUtc,
            },
        });
    }
    /**
     * /order/create
     * Creates orders
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. This identifier is required for all institution tests. If supplied, the testing event is available only to this institution and its children. The web API client must have access to this institution.
     * @param requestBody
     * @returns OrderResponse OK
     * @throws ApiError
     */
    static orderCreate(programId, programInstitutionId, requestBody) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/order/Create',
            query: {
                'program-id': programId,
                'program-institution-id': programInstitutionId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * /order/delete
     * Removes all unused inventory from an order and removes customer access.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. This identifier is required for all institution tests. If supplied, the testing event is available only to this institution and its children. The web API client must have access to this institution.
     * @param requestBody
     * @returns OrderResponse OK
     * @throws ApiError
     */
    static orderDelete(programId, programInstitutionId, requestBody) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'DELETE',
            url: '/order/Delete',
            query: {
                'program-id': programId,
                'program-institution-id': programInstitutionId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
exports.OrderService = OrderService;
//# sourceMappingURL=OrderService.js.map