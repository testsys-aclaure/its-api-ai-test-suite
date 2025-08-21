"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class ResultService {
    /**
     * /result/query
     * Retrieves results of a specific testing event.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. The API matches results linked to this institution and the institution’s children. The API client must have access to this institution.
     * @param resultId The unique ITS database identifier of the test result.
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
     * @param startDate The start date of results in UTC.
     * @param endDate The end date of results in UTC. If the complete flag is set, this is based on the completed date of the result. Otherwise, this is based on the last modified date.
     * @param completedOnly If `true`, only completed results are returned.
     * @param equatedOnly If `true`, only results linked to equated forms are returned.
     * @param includeDemo If `true`, demo results are included.
     * @param includeFlag Bit flag for any information you wish to include in the result. This parameter cannot be used if the `exclude-flag` is used.
     *
     * Bit Information:
     *
     * |     Bit Flag                   |     Bit Value |
     * |--------------------------------|---------------|
     * |     1=Examinee                 |     1         |
     * |     2=Center                   |     2         |
     * |     3=Event                    |     4         |
     * |     4=Actions                  |     8         |
     * |     5=Questions                |     16        |
     * |     6=Groups                   |     32        |
     * |     7=Diagnostics              |     64        |
     * |     8=Sections                 |     128       |
     * |     9=Starts                   |     256       |
     * |     10=Timing                  |     512       |
     * |     11=Survey Questions        |     1024      |
     * |     12=Essays                  |     2048      |
     * |     13=Order Info              |     4096      |
     * |     14=Institution Info        |     8192      |
     * |     15=Cohort Info             |     16384     |
     * |     16=Custom Questions        |     32768     |
     * |     17=Comments                |     65536     |
     * |     18=Accommodations          |     131072    |
     * |     *19=Navigations            |     262144    |
     * |     20=Longitudinal Group Info |     524288    |
     * |     21=Incidents               |     1048576   |
     * |     22=Variables               |     2097152   |
     *
     * * Navigations are not included unless requested with adding Bit 19 to the other Bit Flags requested, if you want all and Navigations use include-flag = 4194303
     * @param excludeFlag Bit flag for any information you wish to exclude from the result. This parameter cannot be used if the `include-flag` parameter is used. Use the above table for Bit Values.
     * @param limit The number of result objects to return. By default, this call returns a maximum of 25 objects.
     * @param beforeId A specific `result-id`. The API returns objects with `result-id`s that precede `before-id`. This parameter cannot be used if `after-id` is used.
     * @param afterId A specific `result-id`. The API returns objects with `result-id`s that follow `after-id`. This parameter cannot be used if `before-id` is used.
     * @returns any OK
     * @throws ApiError
     */
    static resultQuery(programId, programInstitutionId, resultId, examineeId, programExamineeSystemId, programExamineePublicId, programRegistrationId, programCenterId, cohortId, eventId, testId, formId, longitudinalGroupId, startDate, endDate, completedOnly, equatedOnly, includeDemo, includeFlag, excludeFlag, limit = 25, beforeId, afterId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/result/query',
            query: {
                'program-id': programId,
                'program-institution-id': programInstitutionId,
                'result-id': resultId,
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
                'start-date': startDate,
                'end-date': endDate,
                'completed-only': completedOnly,
                'equated-only': equatedOnly,
                'include-demo': includeDemo,
                'include-flag': includeFlag,
                'exclude-flag': excludeFlag,
                'limit': limit,
                'before-id': beforeId,
                'after-id': afterId,
            },
        });
    }
    /**
     * /result/update
     * Updates parts of a result.
     * @param programId The unique program identifier provided as part of configuration.
     * @param resultId The unique ITS database identifier of the test result.
     * @param updateAction Action - 1 :  Description - Complete result
     * @param programInstitutionId The unique program identifier of an institution. The API matches results linked to this institution and the institution’s children. The API client must have access to this institution.
     * @returns ResultUpdateResponse OK
     * @throws ApiError
     */
    static resultUpdate(programId, resultId, updateAction, programInstitutionId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'PATCH',
            url: '/result/update',
            query: {
                'program-id': programId,
                'program-institution-id': programInstitutionId,
                'result-id': resultId,
                'update-action': updateAction,
            },
        });
    }
}
exports.ResultService = ResultService;
//# sourceMappingURL=ResultService.js.map