/**
 * Model object for Inventory
 */
export type InventoryQueryResponse = {
    /**
     * The package code name.
     */
    'package-code'?: string | null;
    /**
     * The number originally purchased in the order.
     */
    purchased?: number | null;
    /**
     * The number of inventory that is still available.
     */
    available?: number | null;
    /**
     * The number of inventory that has been activated.
     */
    activated?: number | null;
    /**
     * The number of inventory that is now expired.
     */
    expired?: number | null;
    /**
     * The number of inventory that have been removed.
     */
    removed?: number | null;
};
//# sourceMappingURL=InventoryQueryResponse.d.ts.map