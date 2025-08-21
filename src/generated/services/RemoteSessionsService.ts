/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Session } from '../models/Session';
import type { SessionCreateRequest } from '../models/SessionCreateRequest';
import type { SessionResponse } from '../models/SessionResponse';
import type { SessionUpdateRequest } from '../models/SessionUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RemoteSessionsService {
    /**
     * /remote/sessions/create
     * Creates remote sessions that are hosted by Program Workshop. This call is for clients who want to create sessions in advance. It should not be used in conjunction with `remote/admin-url/query`, which creates sessions that are embedded in external systems.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. Sessions are linked to this institution. The web API client must have access to this institution.
     * @param requestBody
     * @returns SessionResponse OK
     * @throws ApiError
     */
    public static remoteSessionCreate(
        programId: number,
        programInstitutionId?: string,
        requestBody?: Array<SessionCreateRequest>,
    ): CancelablePromise<Array<SessionResponse>> {
        return __request(OpenAPI, {
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
    public static remoteSessionUpdate(
        programId: number,
        programInstitutionId?: string,
        requestBody?: Array<SessionUpdateRequest>,
    ): CancelablePromise<Array<SessionResponse>> {
        return __request(OpenAPI, {
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
    public static remoteSessionQuery(
        programId: number,
        sessionCode?: string,
        startUtc?: string,
        endUtc?: string,
    ): CancelablePromise<Array<Session>> {
        return __request(OpenAPI, {
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
    public static remoteSessionDelete(
        programId: number,
        sessionCode: Array<string>,
    ): CancelablePromise<Array<SessionResponse>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/remote/sessions/delete',
            query: {
                'program-id': programId,
                'session-code': sessionCode,
            },
        });
    }
}
