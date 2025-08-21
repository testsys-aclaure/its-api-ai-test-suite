"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultsService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class ResultsService {
    /**
     * /result-identifier/Query
     * Retrieves result identifiers that match the requested query.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. The API matches results linked to this institution and the institution’s children. The API client must have access to this institution.
     * @param examineeId The unique ITS database identifier of the examinee.
     * @param programExamineeSystemId The program's system identifier of the examinee.
     * @param programExamineePublicId The program's public or business identifier of the examinee.
     * @param programRegistrationId The program's registration identifier.
     * @param programCenterId The program's managed center.
     * @param cohortId The ITS database identifier of the cohort.
     * @param eventId The ITS database identifier of the event.
     * @param testId The ITS database identifier of the test.
     * @param formId The ITS database identifier of the form.
     * @param longitudinalGroupId The unique ITS database identifier of the longitudinal group.
     * @param startUtc Used in conjunction with the end-utc to give a time range for results with a modified date in that time range, in UTC.
     * @param endUtc Used in conjunction with the start-utc to give a time range for results with a modified date in that time range, in UTC.
     * @param completedOnly If `true`, only completed results are returned.
     * @param equatedOnly If `true`, only results linked to equated forms are returned.
     * @param includeDemo If `true`, demo results are included.
     * @param limit The number of `result-id`s to return. By default, this call returns a maximum of 10,000 identifiers.
     * @param beforeId A specific `result-id`. The API returns `result-id`s that precede `before-id`. This parameter cannot be used if `after-id` is used.
     * @param afterId A specific `result-id`. The API returns `result-id`s that follow `after-id`. This parameter cannot be used if `before-id` is used.
     * @returns ResultIDs OK
     * @throws ApiError
     */
    static resultIdentifierQuery(programId, programInstitutionId, examineeId, programExamineeSystemId, programExamineePublicId, programRegistrationId, programCenterId, cohortId, eventId, testId, formId, longitudinalGroupId, startUtc, endUtc, completedOnly, equatedOnly, includeDemo, limit = 10000, beforeId, afterId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/result-identifier/Query',
            query: {
                'program-id': programId,
                'program-institution-id': programInstitutionId,
                'examinee-id': examineeId,
                'program-examinee-system-id': programExamineeSystemId,
                'program-examinee-public-id': programExamineePublicId,
                'program-registration-id': programRegistrationId,
                'program-center-id': programCenterId,
                'cohort-id': cohortId,
                'event-id': eventId,
                'test-id': testId,
                'form-id': formId,
                'longitudinal-group-id': longitudinalGroupId,
                'start-utc': startUtc,
                'end-utc': endUtc,
                'completed-only': completedOnly,
                'equated-only': equatedOnly,
                'include-demo': includeDemo,
                'limit': limit,
                'before-id': beforeId,
                'after-id': afterId,
            },
        });
    }
}
exports.ResultsService = ResultsService;
//# sourceMappingURL=ResultsService.js.map