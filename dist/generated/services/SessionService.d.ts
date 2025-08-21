import type { Session1 } from '../models/Session1';
import type { SessionCreateInput } from '../models/SessionCreateInput';
import type { SessionResponse1 } from '../models/SessionResponse1';
import type { SessionUpdateInput } from '../models/SessionUpdateInput';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class SessionService {
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
    static sessionQuery(programId: number, programInstitutionId?: string, sessionCode?: string, startUtc?: string, endUtc?: string): CancelablePromise<Array<Session1>>;
    /**
     * /session/create
     * Creates a session that are hosted by Program Workshop.
     * @param programId
     * @param requestBody
     * @param programInstitutionId
     * @returns SessionResponse1 OK
     * @throws ApiError
     */
    static sessionCreate(programId: number, requestBody: SessionCreateInput, programInstitutionId?: string): CancelablePromise<SessionResponse1>;
    /**
     * /session/update
     * Finds and updates an existing session by matching on supplied identifiers.
     * @param programId
     * @param requestBody
     * @param programInstitutionId
     * @returns SessionResponse1 OK
     * @throws ApiError
     */
    static sessionUpdate(programId: number, requestBody: SessionUpdateInput, programInstitutionId?: string): CancelablePromise<SessionResponse1>;
    /**
     * /session/delete
     * Soft deletes a session setting its Active flag to FALSE.
     * @param programId
     * @param sessionCode
     * @returns SessionResponse1 OK
     * @throws ApiError
     */
    static sessionDelete(programId: number, sessionCode: string): CancelablePromise<Array<SessionResponse1>>;
}
//# sourceMappingURL=SessionService.d.ts.map