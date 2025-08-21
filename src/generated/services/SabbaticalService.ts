/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Sabbatical } from '../models/Sabbatical';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SabbaticalService {
    /**
     * /sabbatical/query
     * Queries the Sabbatical tables for information on an examinee’s sabbatical.
     * @param programId The unique program identifier provided as part of configuration.
     * @param examineeId The unique ITS database identifier of the examinee.
     * @param programExamineeSystemId The program’s system identifier of the examinee.
     * @param programExamineePublicId The program’s public or business identifier of the examinee.
     * @param examineeSabbaticalId The unique ITS database identifier of the examinee’s sabbatical.
     * @param startUtc The start date >= of the CreateUTC field of the message record.
     * @param endUtc The end date <= of the CreateUTC field of the message record.
     * @returns Sabbatical OK
     * @throws ApiError
     */
    public static sabbaticalQuery(
        programId: number,
        examineeId?: number,
        programExamineeSystemId?: string,
        programExamineePublicId?: string,
        examineeSabbaticalId?: string,
        startUtc?: string,
        endUtc?: string,
    ): CancelablePromise<Array<Sabbatical>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/sabbatical/Query',
            query: {
                'program-id': programId,
                'examinee-id': examineeId,
                'program-examinee-system-id': programExamineeSystemId,
                'program-examinee-public-id': programExamineePublicId,
                'examinee-sabbatical-id': examineeSabbaticalId,
                'start-utc': startUtc,
                'end-utc': endUtc,
            },
        });
    }
}
