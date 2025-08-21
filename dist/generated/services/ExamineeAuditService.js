"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamineeAuditService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class ExamineeAuditService {
    /**
     * /examinee/audit/query
     * This method queries the examinee audit logs.
     * @param programId The unique program identifier provided as part of configuration.
     * @param timezoneId Defaults to ID=30 – UTC. Use the timezone/query to find the ID of the timezone you want to have the date and time values converted into.
     * @param useDaylightSavings Required if a timezone-id is given.
     * @param includeBitFlag Bit flag for any information you wish to include in the forms object. If include-flag is not requested, all information is included.
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
     * @param examineeId The unique ITS database identifier of the examinee.
     * @param programExamineeSystemId The program’s system identifier of the examinee.
     * @param programExamineePublicId The program’s public or business identifier of the examinee.
     * @param startUtc The start date >= of the audit log records in UTC.
     * @param endUtc The end date <= of the audit log records in UTC.
     * @param languageCode Three-character language code (default is ENU) of language to return.  Currently only affects the "Secure Browser Errors" table query
     * @returns ExamineeAuditResponse OK
     * @throws ApiError
     */
    static examineeAuditQuery(programId, timezoneId, useDaylightSavings, includeBitFlag, examineeId, programExamineeSystemId, programExamineePublicId, startUtc, endUtc, languageCode) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/examinee/audit/query',
            query: {
                'program-id': programId,
                'examinee-id': examineeId,
                'program-examinee-system-id': programExamineeSystemId,
                'program-examinee-public-id': programExamineePublicId,
                'start-utc': startUtc,
                'end-utc': endUtc,
                'timezoneId': timezoneId,
                'useDaylightSavings': useDaylightSavings,
                'languageCode': languageCode,
                'includeBitFlag': includeBitFlag,
            },
        });
    }
    /**
     * /examinee/record/query
     * This method queries a single audit log.
     * @param programId The unique program identifier provided as part of configuration.
     * @param tableName The unique ITS database table name from the audit/query
     * @param recordId The unique ITS database ID number for the record from the audit/query.
     * @returns ExamineeRecordResponse OK
     * @throws ApiError
     */
    static examineeRecordQuery(programId, tableName, recordId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/examinee/record/query',
            query: {
                'program-id': programId,
                'table-name': tableName,
                'record-id': recordId,
            },
        });
    }
}
exports.ExamineeAuditService = ExamineeAuditService;
//# sourceMappingURL=ExamineeAuditService.js.map