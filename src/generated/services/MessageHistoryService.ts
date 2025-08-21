/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Message } from '../models/Message';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MessageHistoryService {
    /**
     * /message-history/query
     * Endpoint for querying message history
     * @param programId The program's unique identifier
     * @param examineeId The unique ITS database identifier of the examinee.
     * @param programExamineeSystemId The program’s system identifier of the examinee.
     * @param programExamineePublicId The program’s public or business identifier of the examinee.
     * @param startUtc The start date >= of the CreateUTC field of the message record.
     * @param endUtc The end date <= of the CreateUTC field of the message record.
     * @param beforeId Before ID for message history
     * @param afterId After ID for message history
     * @param limit Limit of the number of messages returned
     * @returns Message OK
     * @throws ApiError
     */
    public static examineeQuery1(
        programId?: number,
        examineeId?: number,
        programExamineeSystemId?: string,
        programExamineePublicId?: string,
        startUtc?: string,
        endUtc?: string,
        beforeId: number = 9223372036854776000,
        afterId?: number,
        limit: number = 1000,
    ): CancelablePromise<Array<Message>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/message-history/query',
            query: {
                'program-id': programId,
                'examinee-id': examineeId,
                'program-examinee-system-id': programExamineeSystemId,
                'program-examinee-public-id': programExamineePublicId,
                'start-utc': startUtc,
                'end-utc': endUtc,
                'before-id': beforeId,
                'after-id': afterId,
                'limit': limit,
            },
        });
    }
}
