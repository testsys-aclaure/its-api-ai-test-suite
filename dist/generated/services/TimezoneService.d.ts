import type { TimeZoneResponse } from '../models/TimeZoneResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class TimezoneService {
    /**
     * /timezone/query
     * Sorted list of ITS time zones with their ITS TimeZoneID.
     * @returns TimeZoneResponse OK
     * @throws ApiError
     */
    static getTimezoneQuery(): CancelablePromise<Array<TimeZoneResponse>>;
}
//# sourceMappingURL=TimezoneService.d.ts.map