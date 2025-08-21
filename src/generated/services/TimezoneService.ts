/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TimeZoneResponse } from '../models/TimeZoneResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TimezoneService {
    /**
     * /timezone/query
     * Sorted list of ITS time zones with their ITS TimeZoneID.
     * @returns TimeZoneResponse OK
     * @throws ApiError
     */
    public static getTimezoneQuery(): CancelablePromise<Array<TimeZoneResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Timezone/Query',
        });
    }
}
