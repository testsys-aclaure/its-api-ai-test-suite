"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class FormService {
    /**
     * /form/query
     * This method returns the forms an institution is authorized to deliver for an event.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. Only forms accessible by this institution are returned. The web API client must have access to this institution.
     * @param formId The unique database identifier of the form.
     * @param lastModifiedUtc The UTC date/time to find all new or updated forms since that date/time.
     * @param limit The number of result objects to return. By default, this call will return a maximum of 1000 form objects. The limit can be set to any number less than 1000.
     * @param beforeId The form-id is the pagination ID used for this resource. Form objects with IDs immediately before this ID are returned. This parameter cannot be used if after-id is used.
     * @param afterId The form-id is the pagination ID used for this resource. Form objects with IDs immediately after this ID are returned. This parameter cannot be used if before-id is used.
     * @param includeFlag Bit flag for any information you wish to include in the forms object. If include-flag is not requested, all information is included.
     * Example: To include general form information and informational meta data, use 65 to represent 1+ 64.
     * Bit Information:
     *
     * | Bit Flag                       | Bit Value |
     * | ------------------------------ | --------- |
     * | 1 = General Form Information   | 1         |
     * | 3 = Form Selection             | 2         |
     * | 4 = Audits                     | 4         |
     * | 5 = Equating                   | 8         |
     * | 6 = Informational Meta Data    | 16        |
     * | 7 = Delivery Information       | 32        |
     * | 8 = Questions                  | 64        |
     * | 9 = Reporting Groups / Scoring | 128       |
     * | 10 = Projects                  | 256       |
     * | 11 = Project Tasks             | 512       |
     * | 12 = Project Labs              | 1024      |
     * | 13 = Cases                     | 2048      |
     * | 14 = Case Slides               | 4096      |
     * | 15 = Sets                      | 8192      |
     *
     * @returns FormQueryByFilterAsyncResult OK
     * @throws ApiError
     */
    static formQuery(programId, programInstitutionId, formId, lastModifiedUtc, limit, beforeId, afterId, includeFlag) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/Form/Query',
            query: {
                'program-id': programId,
                'program-institution-id': programInstitutionId,
                'form-id': formId,
                'last-modified-utc': lastModifiedUtc,
                'limit': limit,
                'before-id': beforeId,
                'after-id': afterId,
                'include-flag': includeFlag,
            },
        });
    }
    /**
     * /form/create
     * Creates a form.
     * @param programId The unique program identifier provided as part of configuration.
     * @param requestBody
     * @param programInstitutionId The unique program identifier of an institution. Only forms accessible by this institution are returned. The web API client must have access to this institution.
     * @returns FormInsertAsyncResult OK
     * @throws ApiError
     */
    static formCreate(programId, requestBody, programInstitutionId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/Form/Create',
            query: {
                'program-id': programId,
                'program-institution-id': programInstitutionId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * /form/update
     * Updates one or more forms.
     * @param programId The unique program identifier provided as part of configuration.
     * @param requestBody
     * @param programInstitutionId The unique program identifier of an institution. Only forms accessible by this institution are returned. The web API client must have access to this institution.
     * @returns FormUpdateAsyncResult OK
     * @throws ApiError
     */
    static formUpdate(programId, requestBody, programInstitutionId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'PATCH',
            url: '/Form/Update',
            query: {
                'program-id': programId,
                'program-institution-id': programInstitutionId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * /form/delete
     * Deletes one or more forms.  You cannot delete forms linked to a result.
     * @param programId The unique program identifier provided as part of configuration.
     * @param formId The unique database identifier of the form.
     * @param programInstitutionId The unique program identifier of an institution. Only forms accessible by this institution are returned. The web API client must have access to this institution.
     * @returns FormDeleteAsyncResult OK
     * @throws ApiError
     */
    static formDelete(programId, formId, programInstitutionId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'DELETE',
            url: '/Form/Delete',
            query: {
                'program-id': programId,
                'program-institution-id': programInstitutionId,
                'form-id': formId,
            },
        });
    }
}
exports.FormService = FormService;
//# sourceMappingURL=FormService.js.map