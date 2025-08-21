import type { Session } from '../models/Session';
import type { SessionCreateRequest } from '../models/SessionCreateRequest';
import type { SessionResponse } from '../models/SessionResponse';
import type { SessionUpdateRequest } from '../models/SessionUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class RemoteSessionsService {
    /**
     * /remote/sessions/create
     * Creates remote sessions that are hosted by Program Workshop. This call is for clients who want to create sessions in advance. It should not be used in conjunction with `remote/admin-url/query`, which creates sessions that are embedded in external systems.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. Sessions are linked to this institution. The web API client must have access to this institution.
     * @param requestBody
     * @returns SessionResponse OK
     * @throws ApiError
     */
    static remoteSessionCreate(programId: number, programInstitutionId?: string, requestBody?: Array<SessionCreateRequest>): CancelablePromise<Array<SessionResponse>>;
    /**
     * /remote/sessions/update
     * Finds and updates existing remote sessions by matching on supplied identifiers.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. Sessions are linked to this institution. The web API client must have access to this institution.
     * @param requestBody
     * @returns SessionResponse OK
     * @throws ApiError
     */
    static remoteSessionUpdate(programId: number, programInstitutionId?: string, requestBody?: Array<SessionUpdateRequest>): CancelablePromise<Array<SessionResponse>>;
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
    static remoteSessionQuery(programId: number, sessionCode?: string, startUtc?: string, endUtc?: string): CancelablePromise<Array<Session>>;
    /**
     * /remote/sessions/delete
     * Deletes a remote session.
     * @param programId The unique program identifier provided as part of configuration.
     * @param sessionCode The unique identifier of the remote session.
     * @returns SessionResponse OK
     * @throws ApiError
     */
    static remoteSessionDelete(programId: number, sessionCode: Array<string>): CancelablePromise<Array<SessionResponse>>;
}
//# sourceMappingURL=RemoteSessionsService.d.ts.map