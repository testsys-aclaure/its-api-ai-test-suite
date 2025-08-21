import type { Error1 } from '../models/Error1';
import type { Token } from '../models/Token';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class SecureBrowserService {
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
    static secureBrowserErrorsQuery(programId: number, environmentId: number, programInstitutionId?: string, externalRegistrationId?: string, startUtc?: string, endUtc?: string, limit?: number, beforeId?: number, endId?: number): CancelablePromise<Array<Error1>>;
    /**
     * /secure-browser/tokens/validate
     * This API calls our token validator service to respond with whether the token is valid or not
     * @param programId The unique identifier for the program.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    static secureBrowserTokensValidate(programId: number, requestBody: Token): CancelablePromise<any>;
}
//# sourceMappingURL=SecureBrowserService.d.ts.map