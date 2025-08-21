"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignalRDomainService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class SignalRDomainService {
    /**
     * /signalr-domain/query
     * Returns the configured SignalR hostname.
     * @returns QuerySignalRDomainQueryResponse OK
     * @throws ApiError
     */
    static signalRDomainQuery() {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/signalr-domain/query',
        });
    }
}
exports.SignalRDomainService = SignalRDomainService;
//# sourceMappingURL=SignalRDomainService.js.map