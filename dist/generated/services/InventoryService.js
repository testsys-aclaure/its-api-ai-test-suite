"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class InventoryService {
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
    static inventoryQuery(programId, programInstitutionId, orderId, programOrderId, packageCode, startOrderUtc, endOrderUtc, includeFlag) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
exports.InventoryService = InventoryService;
//# sourceMappingURL=InventoryService.js.map