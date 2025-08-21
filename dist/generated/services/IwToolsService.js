"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IwToolsService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class IwToolsService {
    /**
     * /iw-tool/export/tests/query
     * Retrieves ItemBankXML for the forms for a given test
     * @param bankId BankId for the bank from which to retrieve published form.
     * @param formId FormId of the published form to be returned.
     * @returns IBXmlTestResponse OK
     * @throws ApiError
     */
    static testExportQuery(bankId, formId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static itemWorkshopImport(bankId, language, folderId, formData) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static itemWorkshopImportAsync(bankId, language, folderId, callbackUrl, formData) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static itemWorkshopQuery(bankId, importId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/iw-tool/import/query',
            query: {
                'bank-id': bankId,
                'import-id': importId,
            },
        });
    }
}
exports.IwToolsService = IwToolsService;
//# sourceMappingURL=IwToolsService.js.map