"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SabbaticalService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class SabbaticalService {
    /**
     * /sabbatical/query
     * Queries the Sabbatical tables for information on an examinee’s sabbatical.
     * @param programId The unique program identifier provided as part of configuration.
     * @param examineeId The unique ITS database identifier of the examinee.
     * @param programExamineeSystemId The program’s system identifier of the examinee.
     * @param programExamineePublicId The program’s public or business identifier of the examinee.
     * @param examineeSabbaticalId The unique ITS database identifier of the examinee’s sabbatical.
     * @param startUtc The start date >= of the CreateUTC field of the message record.
     * @param endUtc The end date <= of the CreateUTC field of the message record.
     * @returns Sabbatical OK
     * @throws ApiError
     */
    static sabbaticalQuery(programId, examineeId, programExamineeSystemId, programExamineePublicId, examineeSabbaticalId, startUtc, endUtc) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/sabbatical/Query',
            query: {
                'program-id': programId,
                'examinee-id': examineeId,
                'program-examinee-system-id': programExamineeSystemId,
                'program-examinee-public-id': programExamineePublicId,
                'examinee-sabbatical-id': examineeSabbaticalId,
                'start-utc': startUtc,
                'end-utc': endUtc,
            },
        });
    }
}
exports.SabbaticalService = SabbaticalService;
//# sourceMappingURL=SabbaticalService.js.map