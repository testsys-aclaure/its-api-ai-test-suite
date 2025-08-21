"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoteSessionsService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class RemoteSessionsService {
    /**
     * /remote/sessions/create
     * Creates remote sessions that are hosted by Program Workshop. This call is for clients who want to create sessions in advance. It should not be used in conjunction with `remote/admin-url/query`, which creates sessions that are embedded in external systems.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. Sessions are linked to this institution. The web API client must have access to this institution.
     * @param requestBody
     * @returns SessionResponse OK
     * @throws ApiError
     */
    static remoteSessionCreate(programId, programInstitutionId, requestBody) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/remote/sessions/create',
            query: {
                'program-id': programId,
                'program-institution-id': programInstitutionId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * /remote/sessions/update
     * Finds and updates existing remote sessions by matching on supplied identifiers.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. Sessions are linked to this institution. The web API client must have access to this institution.
     * @param requestBody
     * @returns SessionResponse OK
     * @throws ApiError
     */
    static remoteSessionUpdate(programId, programInstitutionId, requestBody) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'PUT',
            url: '/remote/sessions/update',
            query: {
                'program-id': programId,
                'program-institution-id': programInstitutionId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * /remote/sessions/query
     * Retrieves details about a remote session.
     * @param programId The unique program identifier provided as part of configuration.
     * @param sessionCode The unique identifier of the remote session. This parameter is required if `start-utc` and `end-utc` are not supplied.
     * @param startUtc Includes all sessions starting on or after this date. This parameter and `end-utc` are required if `session-code` is not supplied.
     * @param endUtc Includes all sessions ending on or before this date. This parameter and `start-utc` are required if `session-code` is not supplied.
     * @returns Session OK
     * @throws ApiError
     */
    static remoteSessionQuery(programId, sessionCode, startUtc, endUtc) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/remote/sessions/query',
            query: {
                'program-id': programId,
                'session-code': sessionCode,
                'start-utc': startUtc,
                'end-utc': endUtc,
            },
        });
    }
    /**
     * /remote/sessions/delete
     * Deletes a remote session.
     * @param programId The unique program identifier provided as part of configuration.
     * @param sessionCode The unique identifier of the remote session.
     * @returns SessionResponse OK
     * @throws ApiError
     */
    static remoteSessionDelete(programId, sessionCode) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'DELETE',
            url: '/remote/sessions/delete',
            query: {
                'program-id': programId,
                'session-code': sessionCode,
            },
        });
    }
}
exports.RemoteSessionsService = RemoteSessionsService;
//# sourceMappingURL=RemoteSessionsService.js.map