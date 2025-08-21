"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class SessionService {
    /**
     * /session/query
     * Retrieves details about a remote session.
     * @param programId
     * @param programInstitutionId
     * @param sessionCode
     * @param startUtc
     * @param endUtc
     * @returns Session1 OK
     * @throws ApiError
     */
    static sessionQuery(programId, programInstitutionId, sessionCode, startUtc, endUtc) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/session/query',
            query: {
                'program-id': programId,
                'program-institution-id': programInstitutionId,
                'session-code': sessionCode,
                'start-utc': startUtc,
                'end-utc': endUtc,
            },
        });
    }
    /**
     * /session/create
     * Creates a session that are hosted by Program Workshop.
     * @param programId
     * @param requestBody
     * @param programInstitutionId
     * @returns SessionResponse1 OK
     * @throws ApiError
     */
    static sessionCreate(programId, requestBody, programInstitutionId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/session/create',
            query: {
                'program-id': programId,
                'program-institution-id': programInstitutionId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * /session/update
     * Finds and updates an existing session by matching on supplied identifiers.
     * @param programId
     * @param requestBody
     * @param programInstitutionId
     * @returns SessionResponse1 OK
     * @throws ApiError
     */
    static sessionUpdate(programId, requestBody, programInstitutionId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'PATCH',
            url: '/session/update',
            query: {
                'program-id': programId,
                'program-institution-id': programInstitutionId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * /session/delete
     * Soft deletes a session setting its Active flag to FALSE.
     * @param programId
     * @param sessionCode
     * @returns SessionResponse1 OK
     * @throws ApiError
     */
    static sessionDelete(programId, sessionCode) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'DELETE',
            url: '/session/delete',
            query: {
                'program-id': programId,
                'session-code': sessionCode,
            },
        });
    }
}
exports.SessionService = SessionService;
//# sourceMappingURL=SessionService.js.map