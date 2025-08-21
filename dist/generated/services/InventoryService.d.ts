import type { InventoryQueryResponse } from '../models/InventoryQueryResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class InventoryService {
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
    static inventoryQuery(programId: number, programInstitutionId: string, orderId?: Array<number>, programOrderId?: Array<string>, packageCode?: Array<number>, startOrderUtc?: string, endOrderUtc?: string, includeFlag?: number): CancelablePromise<Array<InventoryQueryResponse>>;
}
//# sourceMappingURL=InventoryService.d.ts.map