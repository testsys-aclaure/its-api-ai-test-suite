"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestFormsService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class TestFormsService {
    /**
     * /test/forms/query
     * Return all forms configured for a test and the active status of those forms.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. Only forms accessible by this institution are returned. The web API client must have access to this institution.
     * @param testName The unique textual identifier of the test.
     * @param testId The unique database identifier of the test.
     * @param startUtc The start date and time in UTC that test delivery will occur and forms must be available.
     * @param endUtc The last date and time in UTC that test delivery will occur and forms must be available.
     * @returns TestFormsQueryResponse OK
     * @throws ApiError
     */
    static testFormsQuery(programId, programId, programInstitutionId, testName, testId, startUtc, endUtc) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/test/forms/Query',
            query: {
                'program-id': programId,
                'program-id': programId,
                'program-institution-id': programInstitutionId,
                'test-name': testName,
                'test-id': testId,
                'start-utc': startUtc,
                'end-utc': endUtc,
            },
        });
    }
}
exports.TestFormsService = TestFormsService;
//# sourceMappingURL=TestFormsService.js.map