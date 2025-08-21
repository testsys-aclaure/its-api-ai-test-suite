"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormDefinitionService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class FormDefinitionService {
    /**
     * /form/definition/import
     * Used to import Base64 encoded Form Definition XML. See schema and example files listed in the appendix.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. Sessions are linked to this institution. The web API client must have access to this institution.
     * @param requestBody
     * @returns FormDefinitionResponseReturn OK
     * @throws ApiError
     */
    static formDefinitionImport(programId, programInstitutionId, requestBody) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/form/definition/Import',
            query: {
                'program-id': programId,
                'program-institution-id': programInstitutionId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * /form/definition/query
     * Used to query Form Definition XML. XML is return Base64 encoded.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. Sessions are linked to this institution. The web API client must have access to this institution.
     * @param formId The unique database identifier of the form.
     * @returns FormDefinitionModel OK
     * @throws ApiError
     */
    static formDefinitionQuery(programId, programInstitutionId, formId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/form/definition/Query',
            query: {
                'program-id': programId,
                'program-institution-id': programInstitutionId,
                'form-id': formId,
            },
        });
    }
}
exports.FormDefinitionService = FormDefinitionService;
//# sourceMappingURL=FormDefinitionService.js.map