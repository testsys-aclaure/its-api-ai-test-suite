"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PretestReferenceService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class PretestReferenceService {
    /**
     * /test/pretest-references/query
     * Gets a Pretest References object according to the specified TestIDs.
     * @param programId
     * @param testId
     * @returns PretestReferences OK
     * @throws ApiError
     */
    static testPretestReferencesQuery(programId, testId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/test/pretest-references/Query',
            query: {
                'program-id': programId,
                'test-id': testId,
            },
        });
    }
    /**
     * /test/pretest-references/import
     * Imports Pretest Reference objects into the database from the Pretest References object passed in. A 422 error is returned if 1 or more items or sets are not matched up before importing and the whole import is cancelled.
     * @param programId
     * @param testId
     * @param requestBody
     * @returns string OK
     * @throws ApiError
     */
    static testPretestReferencesImport(programId, testId, requestBody) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/test/pretest-references/Import',
            query: {
                'program-id': programId,
                'test-id': testId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
exports.PretestReferenceService = PretestReferenceService;
//# sourceMappingURL=PretestReferenceService.js.map