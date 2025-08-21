import type { ImportQueryDetail } from './ImportQueryDetail';
import type { ImportQueryError } from './ImportQueryError';
export type ImportQueryResponse = {
    'import-id'?: number | null;
    /**
     * The format of this import.
     */
    'import-format'?: string | null;
    /**
     * The unique database identifier of the folder where data was imported.
     */
    'folder-id'?: number | null;
    /**
     * The date and time this import call started.
     */
    'start-utc'?: string | null;
    /**
     * The date and time this import call completed.
     */
    'end-utc'?: string | null;
    /**
     * Details about each file imported.
     */
    details: Array<ImportQueryDetail>;
    /**
     * Collection of errors from the import.
     */
    errors?: Array<ImportQueryError> | null;
};
//# sourceMappingURL=ImportQueryResponse.d.ts.map