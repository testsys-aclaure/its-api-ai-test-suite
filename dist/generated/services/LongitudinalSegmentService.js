"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LongitudinalSegmentService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class LongitudinalSegmentService {
    /**
     * /examinee/longitudinal-segments/query
     * Retrieves high-level details about examinee segments for a specific longitudinal group.
     * @param programId The unique program identifier provided as part of configuration.
     * @param longitudinalGroupId The unique ITS database identifier of the longitudinal group. If `longitudinal-group-id` and `longitudinal-group-name` are not supplied, all longitudinal groups for the matched examinees are returned.
     * @param longitudinalGroupName The unique textual identifier of the longitudinal group. If `longitudinal-group-id` and `longitudinal-group-name` are not supplied, all longitudinal groups for the matched examinees are returned.
     * @param startUtc Filter for the start date to query from. Must include an end-utc date. Looks for all segments that start in this date range.
     * @param endUtc Filter for the end date to query to. Must include an end-utc date. Looks for all segments that start in this date range.
     * @param cycleNum The cycle sequence number.
     * @param runNum The run sequence number. Must include a cycle number.
     * @param segmentNum The segment sequence number. Must include a cycle and run number.
     * @param examineeId **One of the examinee identifiers below must be supplied**
     * The unique ITS database identifier of the examinee.
     * @param programExamineeSystemId The program's system identifier of the examinee.
     * @param programExamineePublicId The program's public or business identifier of the examinee.
     * @returns Result OK
     * @throws ApiError
     */
    static longitudinalSegmentsQuery(programId, longitudinalGroupId, longitudinalGroupName, startUtc, endUtc, cycleNum, runNum, segmentNum, examineeId, programExamineeSystemId, programExamineePublicId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/examinee/longitudinal-segments/query',
            query: {
                'program-id': programId,
                'longitudinal-group-id': longitudinalGroupId,
                'longitudinal-group-name': longitudinalGroupName,
                'start-utc': startUtc,
                'end-utc': endUtc,
                'cycle-num': cycleNum,
                'run-num': runNum,
                'segment-num': segmentNum,
                'examinee-id': examineeId,
                'program-examinee-system-id': programExamineeSystemId,
                'program-examinee-public-id': programExamineePublicId,
            },
        });
    }
}
exports.LongitudinalSegmentService = LongitudinalSegmentService;
//# sourceMappingURL=LongitudinalSegmentService.js.map