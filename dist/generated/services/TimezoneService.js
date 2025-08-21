"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimezoneService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class TimezoneService {
    /**
     * /timezone/query
     * Sorted list of ITS time zones with their ITS TimeZoneID.
     * @returns TimeZoneResponse OK
     * @throws ApiError
     */
    static getTimezoneQuery() {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/Timezone/Query',
        });
    }
}
exports.TimezoneService = TimezoneService;
//# sourceMappingURL=TimezoneService.js.map