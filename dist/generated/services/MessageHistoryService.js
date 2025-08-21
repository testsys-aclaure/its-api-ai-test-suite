"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageHistoryService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class MessageHistoryService {
    /**
     * /message-history/query
     * Endpoint for querying message history
     * @param programId The program's unique identifier
     * @param examineeId The unique ITS database identifier of the examinee.
     * @param programExamineeSystemId The program’s system identifier of the examinee.
     * @param programExamineePublicId The program’s public or business identifier of the examinee.
     * @param startUtc The start date >= of the CreateUTC field of the message record.
     * @param endUtc The end date <= of the CreateUTC field of the message record.
     * @param beforeId Before ID for message history
     * @param afterId After ID for message history
     * @param limit Limit of the number of messages returned
     * @returns Message OK
     * @throws ApiError
     */
    static examineeQuery1(programId, examineeId, programExamineeSystemId, programExamineePublicId, startUtc, endUtc, beforeId = 9223372036854776000, afterId, limit = 1000) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/message-history/query',
            query: {
                'program-id': programId,
                'examinee-id': examineeId,
                'program-examinee-system-id': programExamineeSystemId,
                'program-examinee-public-id': programExamineePublicId,
                'start-utc': startUtc,
                'end-utc': endUtc,
                'before-id': beforeId,
                'after-id': afterId,
                'limit': limit,
            },
        });
    }
}
exports.MessageHistoryService = MessageHistoryService;
//# sourceMappingURL=MessageHistoryService.js.map