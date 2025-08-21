"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LongitudinalSegmentDetailService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class LongitudinalSegmentDetailService {
    /**
     * /examinee/longitudinal-segment-detail/query
     * Retrieves all the information needed to build an examinee's continuous learning dashboard for a specific segment.
     * @param programId The unique program identifier provided as part of configuration.
     * @param longitudinalGroupId The unique ITS database identifier of the longitudinal group.
     * @param longitudinalGroupName The unique textual identifier of the longitudinal group.
     * @param examineeId **One of the examinee identifiers below must be supplied**
     * The unique ITS database identifier of the examinee.
     * @param programExamineeSystemId The program's system identifier of the examinee.
     * @param programExamineePublicId The program's public or business identifier of the examinee.
     * @param includeFlag Bit flag that represents any information you wish to include in the result.
     * Example: To include examinee and longitudinal information, use 5 to represent 1 + 4.
     * **Bit Information**
     *
     * | Bit Flag                  | Bit Value |
     * |---------------------------|-----------|
     * | 1=Event Information       | 1         |
     * | 2=Detail Information      | 2         |
     * | 3=Score Group Information | 4         |
     * | 4=Time Bank Information   | 8         |
     * @param resultId The unique ITS database identifier of the test result. If this is not supplied, the last result taken by the examinee is returned.
     * @returns LongitudinalGroupSegmentDetail OK
     * @throws ApiError
     */
    static longitudinalSegmentDetailQuery(programId, longitudinalGroupId, longitudinalGroupName, examineeId, programExamineeSystemId, programExamineePublicId, includeFlag, resultId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/examinee/longitudinal-segment-detail/query',
            query: {
                'program-id': programId,
                'longitudinal-group-id': longitudinalGroupId,
                'longitudinal-group-name': longitudinalGroupName,
                'examinee-id': examineeId,
                'program-examinee-system-id': programExamineeSystemId,
                'program-examinee-public-id': programExamineePublicId,
                'include-flag': includeFlag,
                'result-id': resultId,
            },
        });
    }
}
exports.LongitudinalSegmentDetailService = LongitudinalSegmentDetailService;
//# sourceMappingURL=LongitudinalSegmentDetailService.js.map