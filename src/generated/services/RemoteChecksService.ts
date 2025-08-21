/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RemotePracticeCheck } from '../models/RemotePracticeCheck';
import type { SystemsCheckRecord } from '../models/SystemsCheckRecord';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RemoteChecksService {
    /**
     * /remote/practice-checks/query
     * Retrieves details about a practice check.
     * @param programId The unique program identifier provided as part of configuration.
     * @param programInstitutionId The unique program identifier of an institution. Sessions are linked to this institution. The web API client must have access to this institution.
     * @param ipAddress If supplied, the API will return all system checks that originated from this ip-address.  You can request three octets or four octets.  If three octets are requested, the API will return all system checks where the first three octets of the system check ip address matches this ip-address.
     * @param programExamineePublicId The program�s public or business identifier of the examinee.
     * @param startUtc Includes all checks completed on or after this date.
     * @param endUtc Includes all checks completed before this date.
     * @param programRegistrationId The program’s unique identifier for the registration.
     * @param limit The number of `remote-system-check` objects to return. By default, this call returns a maximum of 100 objects. The limit can be set to any number less than 100.
     * @param beforeId A specific `practice-check-id`. The API returns objects with system-check-ids that precede before-id. This parameter cannot be used if after-id is used.
     * @param afterId A specific `practice-check-id`. The API returns objects with system-check-ids that follow after-id. This parameter cannot be used if before-id is used.
     * @returns RemotePracticeCheck OK
     * @throws ApiError
     */
    public static getRemotePracticeChecksQuery(
        programId: number,
        programInstitutionId?: string,
        ipAddress?: string,
        programExamineePublicId?: string,
        startUtc?: string,
        endUtc?: string,
        programRegistrationId?: string,
        limit: number = 100,
        beforeId: number = 9223372036854776000,
        afterId?: number,
    ): CancelablePromise<Array<RemotePracticeCheck>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/remote/practice-checks/Query',
            query: {
                'program-id': programId,
                'program-institution-id': programInstitutionId,
                'ip-address': ipAddress,
                'program-examinee-public-id': programExamineePublicId,
                'start-utc': startUtc,
                'end-utc': endUtc,
                'program-registration-id': programRegistrationId,
                'limit': limit,
                'before-id': beforeId,
                'after-id': afterId,
            },
        });
    }
    /**
     * /remote/system-checks/query
     * Retrieves details about a remote system check.
     * @param programId The unique program identifier provided as part of configuration.
     * @param ipAddress If supplied, the API will return all system checks that originated from this ip-address. You can request three octets or four octets. If three octets are requested, the API will return all system checks where the first three octets of the system check ip address matches this ip-address.
     * @param startUtc Includes all checks completed on or after this date.
     * @param endUtc Includes all checks completed before this date.
     * @param limit Includes all checks completed before this date.
     * @param beforeId A specific system-check-id. The API returns objects with  system-check-ids that precede before-id. This parameter cannot be used if after-id is used.
     * @param afterId A specific system-check-id. The API returns objects with system-check-ids that follow after-id. This parameter cannot be used if before-id is used.
     * @returns SystemsCheckRecord OK
     * @throws ApiError
     */
    public static getRemoteSystemChecksQuery(
        programId: number,
        ipAddress?: Array<string>,
        startUtc?: string,
        endUtc?: string,
        limit: number = 100,
        beforeId: number = 9223372036854776000,
        afterId?: number,
    ): CancelablePromise<Array<SystemsCheckRecord>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/remote/system-checks/Query',
            query: {
                'program-id': programId,
                'ip-address': ipAddress,
                'start-utc': startUtc,
                'end-utc': endUtc,
                'limit': limit,
                'before-id': beforeId,
                'after-id': afterId,
            },
        });
    }
}
