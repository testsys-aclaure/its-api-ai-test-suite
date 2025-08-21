"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormsService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class FormsService {
    /**
     * form/reports/query
     * This method returns the form reporting data for a specific form.
     * @param programId
     * @param testId
     * @param formId
     * @returns FormReportQueryResult OK
     * @throws ApiError
     */
    static getFormReportsQuery(programId, testId, formId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/form/reports/Query',
            query: {
                'program-id': programId,
                'test-id': testId,
                'form-id': formId,
            },
        });
    }
    /**
     * form/res-files/query
     * This method returns the binary encrypted RES file for a specific form.
     * @param programId
     * @param formId
     * @returns binary OK
     * @throws ApiError
     */
    static getFormResFilesQuery(programId, formId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/form/res-files/Query',
            query: {
                'program-id': programId,
                'form-id': formId,
            },
            errors: {
                422: `Unprocessable Content`,
            },
        });
    }
}
exports.FormsService = FormsService;
//# sourceMappingURL=FormsService.js.map