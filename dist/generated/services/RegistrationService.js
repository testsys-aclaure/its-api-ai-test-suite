"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class RegistrationService {
    /**
     * /registration/import
     * Creates a new registration or updates all fields for the record if given a program-registration-id.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. Sessions are linked to this institution.  The web API client must have access to this institution.
     * @param requestBody
     * @returns RegistrationImportResponse OK
     * @throws ApiError
     */
    static registrationImportCreate(programId, programInstitutionId, requestBody) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/registration/import',
            query: {
                'program-id': programId,
                'program-institution-id': programInstitutionId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * /registration/import
     * Updates only the fields given for the record if given a program-registration-id.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. Sessions are linked to this institution.  The web API client must have access to this institution.
     * @param requestBody
     * @returns RegistrationImportResponse OK
     * @throws ApiError
     */
    static registrationUpdate(programId, programInstitutionId, requestBody) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'PUT',
            url: '/registration/import',
            query: {
                'program-id': programId,
                'program-institution-id': programInstitutionId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * /registration/update
     * This will update a registration to link an examinee to it.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. Sessions are linked to this institution.  The web API client must have access to this institution.
     * @param examineeId
     * @param programExamineePublicId
     * @param programExamineeSystemId
     * @param programExamineeInstitutionId
     * @param programRegistrationId
     * @param registrationId
     * @returns RegistrationUpdateResponse OK
     * @throws ApiError
     */
    static patchRegistrationUpdate(programId, programInstitutionId, examineeId, programExamineePublicId, programExamineeSystemId, programExamineeInstitutionId, programRegistrationId, registrationId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'PATCH',
            url: '/registration/update',
            query: {
                'program-id': programId,
                'program-institution-id': programInstitutionId,
                'examinee-id': examineeId,
                'program-examinee-public-id': programExamineePublicId,
                'program-examinee-system-id': programExamineeSystemId,
                'program-examinee-institution-id': programExamineeInstitutionId,
                'program-registration-id': programRegistrationId,
                'registration-id': registrationId,
            },
        });
    }
    /**
     * /registration/query
     * This registration query will return registrations based on the filters provided.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. Sessions are linked to this institution.  The web API client must have access to this institution.
     * @param registrationId
     * @param programRegistrationId
     * @param examineeId
     * @param programExamineePublicId
     * @param programExamineeSystemId
     * @param programExamineeInstitutionId
     * @param startUtc
     * @param endUtc
     * @param testId
     * @param started
     * @param completed
     * @param excludeFlag
     * @param limit
     * @param beforeId
     * @param afterId
     * @returns RegistrationQueryResponse OK
     * @throws ApiError
     */
    static registrationQuery(programId, programInstitutionId, registrationId, programRegistrationId, examineeId, programExamineePublicId, programExamineeSystemId, programExamineeInstitutionId, startUtc, endUtc, testId, started, completed, excludeFlag, limit, beforeId, afterId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/registration/query',
            query: {
                'program-id': programId,
                'program-institution-id': programInstitutionId,
                'registration-id': registrationId,
                'program-registration-id': programRegistrationId,
                'examinee-id': examineeId,
                'program-examinee-public-id': programExamineePublicId,
                'program-examinee-system-id': programExamineeSystemId,
                'program-examinee-institution-id': programExamineeInstitutionId,
                'start-utc': startUtc,
                'end-utc': endUtc,
                'test-id': testId,
                'started': started,
                'completed': completed,
                'exclude-flag': excludeFlag,
                'limit': limit,
                'before-id': beforeId,
                'after-id': afterId,
            },
        });
    }
    /**
     * /registration/delete
     * This will delete registrations that do not have results started for them.
     * @param programId The unique program identifier provided as part of configuration.
     * @param reason
     * @param programInstitutionId The unique program identifier of an institution. Sessions are linked to this institution.  The web API client must have access to this institution.
     * @param registrationId
     * @param programRegistrationId
     * @returns RegistrationDeleteStatus OK
     * @throws ApiError
     */
    static registrationDelete(programId, reason, programInstitutionId, registrationId, programRegistrationId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'DELETE',
            url: '/registration/delete',
            query: {
                'program-id': programId,
                'program-institution-id': programInstitutionId,
                'registration-id': registrationId,
                'program-registration-id': programRegistrationId,
                'Reason': reason,
            },
        });
    }
}
exports.RegistrationService = RegistrationService;
//# sourceMappingURL=RegistrationService.js.map