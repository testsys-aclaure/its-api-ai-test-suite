/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Session1 } from '../models/Session1';
import type { SessionCreateInput } from '../models/SessionCreateInput';
import type { SessionResponse1 } from '../models/SessionResponse1';
import type { SessionUpdateInput } from '../models/SessionUpdateInput';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SessionService {
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
    public static sessionQuery(
        programId: number,
        programInstitutionId?: string,
        sessionCode?: string,
        startUtc?: string,
        endUtc?: string,
    ): CancelablePromise<Array<Session1>> {
        return __request(OpenAPI, {
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
    public static sessionCreate(
        programId: number,
        requestBody: SessionCreateInput,
        programInstitutionId?: string,
    ): CancelablePromise<SessionResponse1> {
        return __request(OpenAPI, {
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
    public static sessionUpdate(
        programId: number,
        requestBody: SessionUpdateInput,
        programInstitutionId?: string,
    ): CancelablePromise<SessionResponse1> {
        return __request(OpenAPI, {
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
    public static sessionDelete(
        programId: number,
        sessionCode: string,
    ): CancelablePromise<Array<SessionResponse1>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/session/delete',
            query: {
                'program-id': programId,
                'session-code': sessionCode,
            },
        });
    }
}
