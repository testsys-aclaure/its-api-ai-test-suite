/**
 * Returns the delete status of the form.
 */
export type FormDeleteAsyncResult = {
    /**
     * The unique ITS database identifier of the form.
     */
    'form-id'?: number;
    /**
     * The unique textual identifier of the form.
     */
    'form-name'?: string | null;
    /**
     * The delete status of the form. Possible values: deleted, skipped-linked-result.
     */
    status: string | null;
};
//# sourceMappingURL=FormDeleteAsyncResult.d.ts.map