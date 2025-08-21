export type OrderResponse = {
    /**
     * The unique ITS database identifier of the order.
     */
    'order-id'?: number | null;
    /**
     * The program-assigned, alpha-numeric identifier of the order.  Make sure that this is a unique identifier on the program side when creating or updating the order record.
     */
    'order-code'?: string | null;
    /**
     * The delete status of the order. Possible values: `removed-unused-inventory`, `no-remaining-inventory`.
     */
    status?: string | null;
    message?: string | null;
};
//# sourceMappingURL=OrderResponse.d.ts.map