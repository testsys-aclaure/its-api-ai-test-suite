"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecureBrowserService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class SecureBrowserService {
    /**
     * /secure-brower/errors/query
     * This query returns the secure browser errors based on the optional filters.
     * @param programId The unique identifier for the program.
     * @param environmentId The ID of the environment to run the query on.
     * @param programInstitutionId The customer’s unique Institution Code.
     * @param externalRegistrationId The customer’s unique registration ID.
     * @param startUtc The start date to query by.
     * @param endUtc The end date to query by
     * @param limit The limit of the number of records returned
     * @param beforeId The id to return all records with an id before this point.
     * @param endId The id to return all records with an id before this point.
     * @returns Error1 OK
     * @throws ApiError
     */
    static secureBrowserErrorsQuery(programId, environmentId, programInstitutionId, externalRegistrationId, startUtc, endUtc, limit, beforeId, endId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/secure-browser/errors/query',
            query: {
                'program-id': programId,
                'environment-id': environmentId,
                'program-institution-id': programInstitutionId,
                'external-registration-id': externalRegistrationId,
                'start-utc': startUtc,
                'end-utc': endUtc,
                'limit': limit,
                'before-id': beforeId,
                'end-id': endId,
            },
        });
    }
    /**
     * /secure-browser/tokens/validate
     * This API calls our token validator service to respond with whether the token is valid or not
     * @param programId The unique identifier for the program.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    static secureBrowserTokensValidate(programId, requestBody) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/secure-browser/tokens/validate',
            query: {
                'program-id': programId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
exports.SecureBrowserService = SecureBrowserService;
//# sourceMappingURL=SecureBrowserService.js.map