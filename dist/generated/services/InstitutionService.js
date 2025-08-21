"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstitutionService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class InstitutionService {
    /**
     * /channel/institutions/query
     * Retrieves institutions.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The institutions imported will be children of this parent institution. The web API client must have access to this institution, or a parent of this institution.
     * @param limit The number of examinee objects to return. By default, this call returns a maximum of 500 objects. The limit can be set to any number less than 500.
     * @param beforeId A specific `examinee-id`. The API returns objects with `examinee-id`s that precede `before-id`. This parameter cannot be used if `after-id` is used.
     * @param afterId A specific `examinee-id`. The API returns objects with `examinee-id`s that follow `after-id`. This parameter cannot be used if `before-id` is used.
     * @returns QueryInstitutionResponse OK
     * @throws ApiError
     */
    static channelInstitutionQuery(programId, programInstitutionId, limit = 500, beforeId, afterId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/channel/institutions/query',
            query: {
                'program-id': programId,
                'program-institution-id': programInstitutionId,
                'limit': limit,
                'before-id': beforeId,
                'after-id': afterId,
            },
        });
    }
    /**
     * /channel/institutions/import
     * Creates institutions.
     * @param programId The unique program identifier provided as part of configuration.
     * @param parentProgramInstitutionId The institutions imported will be children of this parent institution. The web API client must have access to this institution or a parent of this institution. This parameter is required if the web API client is an institution-level client.
     * @param requestBody
     * @returns ImportInstitutionResponse OK
     * @throws ApiError
     */
    static channelInstitutionImport(programId, parentProgramInstitutionId, requestBody) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/channel/institutions/import',
            query: {
                'program-id': programId,
                'parent-program-institution-id': parentProgramInstitutionId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * /channel/institutions/import
     * Creates institutions.
     * @param programId The unique program identifier provided as part of configuration.
     * @param parentProgramInstitutionId The institutions imported will be children of this parent institution. The web API client must have access to this institution or a parent of this institution. This parameter is required if the web API client is an institution-level client.
     * @param requestBody
     * @returns ImportInstitutionResponse OK
     * @throws ApiError
     */
    static channelInstitutionImport1(programId, parentProgramInstitutionId, requestBody) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'PATCH',
            url: '/channel/institutions/import',
            query: {
                'program-id': programId,
                'parent-program-institution-id': parentProgramInstitutionId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
exports.InstitutionService = InstitutionService;
//# sourceMappingURL=InstitutionService.js.map