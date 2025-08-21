"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LongitudinalGroupExamineesService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class LongitudinalGroupExamineesService {
    /**
     * /longitudinal-group/examinees/query
     * Retrieves details about examinees in a longitudinal group.
     * @param programId The unique program identifier provided as part of configuration.
     * @param longitudinalGroupId The unique ITS database identifier of the longitudinal group. If `longitudinal-group-id` and `longitudinal-group-name` are not supplied, all longitudinal groups for the matched examinees are returned.
     * @param longitudinalGroupName The unique textual identifier of the longitudinal group. If `longitudinal-group-id` and `longitudinal-group-name` are not supplied, all longitudinal groups for the matched examinees are returned.
     * @param examineeId **One of the examinee identifiers below must be supplied**
     * The unique ITS database identifier of the examinee.
     * @param programExamineeSystemId The program's system identifier of the examinee.
     * @param programExamineePublicId The program's public or business identifier of the examinee.
     * @param limit The number of Longitudinal Group Examinee objects to return. By default, this call returns a maximum of 500 objects. The limit can be set to any number less than 500.
     * @param beforeId A specific examinee-id. The API returns objects with examinee-ids that precede before-id. This parameter cannot be used if after-id is used.
     * @param afterId A specific examinee-id. The API returns objects with examinee-ids that follow after-id. This parameter cannot be used if before-id is used.
     * @returns LongitudinalGroupExaminee OK
     * @throws ApiError
     */
    static getLongitudinalGroupExamineesQuery(programId, longitudinalGroupId, longitudinalGroupName, examineeId, programExamineeSystemId, programExamineePublicId, limit = 500, beforeId, afterId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/longitudinal-group/examinees/query',
            query: {
                'program-id': programId,
                'longitudinal-group-id': longitudinalGroupId,
                'longitudinal-group-name': longitudinalGroupName,
                'examinee-id': examineeId,
                'program-examinee-system-id': programExamineeSystemId,
                'program-examinee-public-id': programExamineePublicId,
                'limit': limit,
                'before-id': beforeId,
                'after-id': afterId,
            },
        });
    }
    /**
     * /longitudinal-group/examinees/create
     * Enrolls examinees in a longitudinal group.
     * @param programId The unique program identifier provided as part of configuration.
     * @param requestBody
     * @returns LongitudinalGroupExamineResponse OK
     * @throws ApiError
     */
    static postLongitudinalGroupExamineesCreate(programId, requestBody) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/longitudinal-group/examinees/create',
            query: {
                'program-id': programId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * /longitudinal-group/examinees/update
     * Finds and updates existing examinees in longitudinal groups by matching on supplied identifiers.
     * @param programId The unique program identifier provided as part of configuration.
     * @param requestBody
     * @returns LongitudinalGroupExamineResponse OK
     * @throws ApiError
     */
    static putLongitudinalGroupExamineesUpdate(programId, requestBody) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'PUT',
            url: '/longitudinal-group/examinees/update',
            query: {
                'program-id': programId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * /longitudinal-group/examinees/delete
     * Removes an examinee from a longitudinal group.
     * @param programId The unique program identifier provided as part of configuration.
     * @param longitudinalGroupId The unique ITS database identifier of the longitudinal group. This is required if longitudinal-group-name is not supplied. If no optional filters are supplied, all examinees linked to the group are removed.
     * @param longitudinalGroupName The unique textual identifier of the longitudinal group. This is required if longitudinal-group-id is not supplied. If no optional filters are supplied, all examinees linked to the group are removed.
     * @param examineeId **One of the examinee identifiers below must be supplied**
     * The unique ITS database identifier of the examinee.
     * @param programExamineeSystemId The program's system identifier of the examinee.
     * @param programExamineePublicId The program's public or business identifier of the examinee.
     * @param permanentDelete The default is false. This option is available only if the examinee has not taken any results within the longitudinal group. If true, the records are deleted from the database. If false, the examinee's longitudinal group is set to inactive.
     * @returns LongitudinalGroupExamineResponse OK
     * @throws ApiError
     */
    static deleteLongitudinalGroupExamineesDelete(programId, longitudinalGroupId, longitudinalGroupName, examineeId, programExamineeSystemId, programExamineePublicId, permanentDelete) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'DELETE',
            url: '/longitudinal-group/examinees/delete',
            query: {
                'program-id': programId,
                'longitudinal-group-id': longitudinalGroupId,
                'longitudinal-group-name': longitudinalGroupName,
                'examinee-id': examineeId,
                'program-examinee-system-id': programExamineeSystemId,
                'program-examinee-public-id': programExamineePublicId,
                'permanent-delete': permanentDelete,
            },
        });
    }
}
exports.LongitudinalGroupExamineesService = LongitudinalGroupExamineesService;
//# sourceMappingURL=LongitudinalGroupExamineesService.js.map