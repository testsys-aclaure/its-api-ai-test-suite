/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserResponse } from '../models/UserResponse';
import type { UsersDeleteResponse } from '../models/UsersDeleteResponse';
import type { UserStatusFlags } from '../models/UserStatusFlags';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserService {
    /**
     * /user/query
     * List of users and their associated data.
     * @param vendorId The unique database identifier of the vendor.
     * @param sponsorId The unique database identifier of the sponsor.
     * @param userId The unique ITS database identifier of the user.
     * @param programUserSystemId The program's system-generated unique identifier of the user. Used to link the ITS system with a program's system for SSO and system-to-system imports.
     * @param programUserPublicId The program's public identifier of a user. For example, the user's Board ID.
     * @param includedUserTypes Determine which types of users to return.
     *
     * | User Type | Description                                                  |
     * | --------- | ------------------------------------------------------------ |
     * | 1         | Returns all user types that match the filter specifications. |
     * | 2         | Returns only vendor users.                                   |
     * | 3         | Returns only sponsor users.                                  |
     * | 4         | Returns only institution users.                              |
     *
     * @param includedUserStatuses Determine which user statuses to return.
     *
     * | User Type | Description  |
     * | --------- | ------------ |
     * | 1         | Active       |
     * | 2         | Inactive     |
     * | 4         | Deleted      |
     *
     * @returns UserResponse OK
     * @throws ApiError
     */
    public static getUserQuery(
        vendorId?: number,
        sponsorId?: number,
        userId?: Array<number>,
        programUserSystemId?: Array<string>,
        programUserPublicId?: Array<string>,
        includedUserTypes?: number,
        includedUserStatuses?: UserStatusFlags,
    ): CancelablePromise<Array<UserResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/User/query',
            query: {
                'vendor-id': vendorId,
                'sponsor-id': sponsorId,
                'user-id': userId,
                'program-user-system-id': programUserSystemId,
                'program-user-public-id': programUserPublicId,
                'included-user-types': includedUserTypes,
                'included-user-statuses': includedUserStatuses,
            },
        });
    }
    /**
     * /user/delete
     * Deletes a user.
     * @param vendorId The unique identifier of the vendor.
     * @param programInstitutionId The unique program identifier of an institution. Users are linked to this institution. The web API client must have access to this institution.
     * @param userId The unique ITS database identifier of the user.
     * @param programUserSystemId The unique program identifier of the user.
     * @param programUserPublicId The unique program public identifier of the user.
     * @returns UsersDeleteResponse OK
     * @throws ApiError
     */
    public static deleteUserDelete(
        vendorId: number,
        programInstitutionId?: string,
        userId?: Array<number>,
        programUserSystemId?: Array<string>,
        programUserPublicId?: Array<string>,
    ): CancelablePromise<Array<UsersDeleteResponse>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/User/delete',
            query: {
                'vendor-id': vendorId,
                'program-institution-id': programInstitutionId,
                'user-id': userId,
                'program-user-system-id': programUserSystemId,
                'program-user-public-id': programUserPublicId,
            },
        });
    }
}
