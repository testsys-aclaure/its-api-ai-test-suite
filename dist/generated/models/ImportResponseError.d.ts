/**
 * Item Workshop Import response error object, used in synchronous call.
 */
export type ImportResponseError = {
    /**
     * The type of import error the current error is. Can be the resource type or “General”.
     */
    'error-type'?: string | null;
    /**
     * If this is resource-level error returns resource name of resource in the current folder.
     */
    'resource-name'?: string | null;
    /**
     * Error description.
     */
    'error-description'?: string | null;
};
//# sourceMappingURL=ImportResponseError.d.ts.map