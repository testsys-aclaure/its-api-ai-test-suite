/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IBXmlTestResponse } from '../models/IBXmlTestResponse';
import type { ImportQueryResponse } from '../models/ImportQueryResponse';
import type { ImportResponse } from '../models/ImportResponse';
import type { ImportResponseAsync } from '../models/ImportResponseAsync';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class IwToolsService {
    /**
     * /iw-tool/export/tests/query
     * Retrieves ItemBankXML for the forms for a given test
     * @param bankId BankId for the bank from which to retrieve published form.
     * @param formId FormId of the published form to be returned.
     * @returns IBXmlTestResponse OK
     * @throws ApiError
     */
    public static testExportQuery(
        bankId: number,
        formId: number,
    ): CancelablePromise<IBXmlTestResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/iw-tool/export/tests/query',
            query: {
                'bank-id': bankId,
                'form-id': formId,
            },
        });
    }
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
    public static itemWorkshopImport(
        bankId: number,
        language: string,
        folderId: number,
        formData?: {
            'import-data'?: Blob;
        },
    ): CancelablePromise<ImportResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/iw-tool/import/import',
            query: {
                'bank-id': bankId,
                'language': language,
                'folder-id': folderId,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
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
    public static itemWorkshopImportAsync(
        bankId: number,
        language: string,
        folderId: number,
        callbackUrl?: string,
        formData?: {
            'import-data'?: Blob;
        },
    ): CancelablePromise<ImportResponseAsync> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/iw-tool/import/import-async',
            query: {
                'bank-id': bankId,
                'language': language,
                'folder-id': folderId,
                'callback-url': callbackUrl,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * /iw-tool/import/query
     * Item Workshop query of import status.
     * @param bankId The unique ITS database identifier of the bank provided as part of configuration.
     * @param importId The unique ITS database identifier of the import.
     * @returns ImportQueryResponse OK
     * @throws ApiError
     */
    public static itemWorkshopQuery(
        bankId: number,
        importId: number,
    ): CancelablePromise<ImportQueryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/iw-tool/import/query',
            query: {
                'bank-id': bankId,
                'import-id': importId,
            },
        });
    }
}
