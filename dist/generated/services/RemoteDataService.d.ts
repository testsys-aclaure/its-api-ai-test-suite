import type { SessionData } from '../models/SessionData';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class RemoteDataService {
    /**
     * /remote/admin-urls/query
     * Retrieves a URL to a proctor session management portal.
     * @param programId The unique program identifier provided as part of configuration.
     * @param urlType 1 = Direct session access (requires session code to be provided)
     *
     * 2 = Session management (allows proctor to create and visit sessions)
     * @param proctorIdentifier The unique identifier of the proctor. This ID will be used in session audit logs.
     * @param proctorDisplayName The proctor name that will be displayed on the session detail and session management pages.
     * @param proctorFirstName The first name of the proctor.
     * @param proctorLastName The last name of the proctor.
     * @param programInstitutionId The unique program identifier of an institution. Sessions are linked to this institution. The web API client must have access to this institution.
     * @param userId
     * @param sessionCode `url-type` = 1. The unique identifier of the session. The `session-code` can refer to both existing, previously used, and new sessions. This is required if `url-type` = 1.
     * @param redirectUrl Users are redirected to this URL when the remote URL is used after the expiration period (24 hours).
     * @param examineePortalOptions
     * @param groupIdentifier `url-type` = 2. Limits proctor to see sessions linked to this `group-identifier`.
     * @param limitDays `url-type` = 2. Limits proctor to see sessions created `limit-days` in the past. Set to 0 for same day only. The default is 0.
     * @param reserveNumber The number of examinees participating in the remote-proctored session.
     * @param reserveTime The start time in UTC of the remoted-proctored session.
     * @param parentSessionCode This parameter is only needed in a battery scenario where each subsequent test is delivered in a new session, and the session being created is occurring before the previous session’s reservations have expired. `parent-session-code` allows for all connections of the new session to assume the previous session’s reservations.
     * @param resumeSession When set, the session expiration time is extended to the end of the day.
     * @param minutesOffset Minutes offset from UTC. The session expiration will be at midnight of the current day based on offset, or eight hours after start of session, whichever is later. If not provided, then offset will be EST (-300) / EDT(-240).
     * @param sessionExpiration The expiration date and time of the session. `minutes-offset` will be honored to determine the time zone. If `minutes-offset` is not provided, then offset will be EST (-300) / EDT(-240).
     * @param proctorFunctions
     * @returns string OK
     * @throws ApiError
     */
    static remoteAdminUrlsQuery(programId: number, urlType: number, proctorIdentifier: string, proctorDisplayName: string, proctorFirstName: string, proctorLastName: string, programInstitutionId?: string, userId?: number, sessionCode?: string, redirectUrl?: string, examineePortalOptions?: number, groupIdentifier?: string, limitDays?: number, reserveNumber?: number, reserveTime?: string, parentSessionCode?: string, resumeSession?: boolean, minutesOffset?: number, sessionExpiration?: string, proctorFunctions?: number): CancelablePromise<string>;
    /**
     * /remote/examinee-data/query
     * This call returns URLs to retrieve examinee videos, chat logs, and photos for one or more examinees.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. Sessions are linked to this institution. The web API client must have access to this institution.
     * @param sessionCode The unique identifier of the session.
     * @param examinee The internal database identifier of the examinee.
     * @param programExamineePublicId The public identifier of the examinee. For example, a student identifier. Returned if available.
     * @param programExamineeSystemId The external system identifier for the examinee. This is typically a database identifier. Returned if available.
     * @param dataOptions Use the bitflag below to specify what information to return. The default is 31.
     * @param urlAvailableHours The number of hours the video, photo, and chat log URLs will be accessible after the URL is generated.
     * @returns SessionData OK
     * @throws ApiError
     */
    static remoteExamineeDataQuery(programId: number, programInstitutionId?: string, sessionCode?: string, examinee?: Array<number>, programExamineePublicId?: string, programExamineeSystemId?: string, dataOptions?: number, urlAvailableHours?: number): CancelablePromise<Array<SessionData>>;
    /**
     * /remote/session-data/query
     * Retrieves videos, chat logs, and photos for one or more examinees.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. Sessions are linked to this institution. The web API client must have access to this institution.
     * @param sessionCode The unique identifier of the session.
     * @param dataOptions Use the bitflag below to specify what information to return. The default is 31.
     * @param flaggedOnly If set to `true`, only examinees with at least one flagged video recording will be included in the response object.
     * @param urlAvailableHours The number of hours the video, photo, and chat log URLs will be accessible after the URL is generated.
     * @returns SessionData OK
     * @throws ApiError
     */
    static remoteSessionDataQuery(programId: number, programInstitutionId?: string, sessionCode?: string, dataOptions?: number, flaggedOnly?: boolean, urlAvailableHours?: number): CancelablePromise<Array<SessionData>>;
}
//# sourceMappingURL=RemoteDataService.d.ts.map