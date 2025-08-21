import type { IBXmlTestResponse } from '../models/IBXmlTestResponse';
import type { ImportQueryResponse } from '../models/ImportQueryResponse';
import type { ImportResponse } from '../models/ImportResponse';
import type { ImportResponseAsync } from '../models/ImportResponseAsync';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class IwToolsService {
    /**
     * /iw-tool/export/tests/query
     * Retrieves ItemBankXML for the forms for a given test
     * @param bankId BankId for the bank from which to retrieve published form.
     * @param formId FormId of the published form to be returned.
     * @returns IBXmlTestResponse OK
     * @throws ApiError
     */
    static testExportQuery(bankId: number, formId: number): CancelablePromise<IBXmlTestResponse>;
    /**
     * /iw-tool/import/import
     * Item Workshop synchronous import.
     * @param bankId The unique ITS database identifier of the bank provided as part of configuration.
     * @param language The three-letter ISO language code.
     * @param folderId The unique ITS database identifier of the folder where the data will be imported.
     * @param formData
     * @returns ImportResponse OK
     * @throws ApiError
     */
    static itemWorkshopImport(bankId: number, language: string, folderId: number, formData?: {
        'import-data'?: Blob;
    }): CancelablePromise<ImportResponse>;
    /**
     * /iw-tool/import/import-async
     * Item Workshop asynchronous import.
     * @param bankId The unique ITS database identifier of the bank provided as part of configuration.
     * @param language The three-letter ISO language code.
     * @param folderId The unique ITS database identifier of the folder where the data will be imported.
     * @param callbackUrl The URL to call when the import is complete. If this is not supplied, the notification that the import is complete is sent to the URL configured for ITS event notifications.
     * @param formData
     * @returns ImportResponseAsync OK
     * @throws ApiError
     */
    static itemWorkshopImportAsync(bankId: number, language: string, folderId: number, callbackUrl?: string, formData?: {
        'import-data'?: Blob;
    }): CancelablePromise<ImportResponseAsync>;
    /**
     * /iw-tool/import/query
     * Item Workshop query of import status.
     * @param bankId The unique ITS database identifier of the bank provided as part of configuration.
     * @param importId The unique ITS database identifier of the import.
     * @returns ImportQueryResponse OK
     * @throws ApiError
     */
    static itemWorkshopQuery(bankId: number, importId: number): CancelablePromise<ImportQueryResponse>;
}
//# sourceMappingURL=IwToolsService.d.ts.map