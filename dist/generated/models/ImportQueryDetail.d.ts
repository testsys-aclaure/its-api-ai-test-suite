/**
 * Item Workshop Import Query response detail object.
 */
export type ImportQueryDetail = {
    /**
     * Item, File, or Form.
     */
    'resource-type': string;
    /**
     * The name of the form.
     */
    'resource-name': string;
    /**
     * The language of the import.
     */
    'resource-language': string;
    /**
     * The version of the resource.
     */
    'resource-version': string;
    /**
     * Added, Updated, Unchanged (Skipped), Error.
     */
    status: string;
};
//# sourceMappingURL=ImportQueryDetail.d.ts.map