import type { UserAccessDeleteResponse } from '../models/UserAccessDeleteResponse';
import type { UserAccessQueryResponse } from '../models/UserAccessQueryResponse';
import type { UserStatusFlags } from '../models/UserStatusFlags';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class UserAccessService {
    /**
     * /user/access/query
     * Retrieves user access information.
     * @param vendorId The unique database identifier of the vendor.
     * @param sponsorId The unique database identifier of the sponsor.
     * @param programId The unique program identifier provided as part of configuration. If supplied, users with access to the requested programs will be returned.
     * @param programInstitutionId The program’s unique identifier of an institution. If supplied, users with access to the requested institutions will be returned.
     * @param userId The unique ITS database identifier of the user.
     * @param programUserSystemId The program’s system-generated unique identifier of the user. Used to link the ITS system with a program’s system for SSO and system-to-system imports.
     * @param programUserPublicId The program’s public identifier of a user. For example, the user’s Board ID.
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
     * @returns UserAccessQueryResponse OK
     * @throws ApiError
     */
    static queryUserAccess(vendorId?: number, sponsorId?: number, programId?: Array<number>, programInstitutionId?: Array<string>, userId?: Array<number>, programUserSystemId?: Array<string>, programUserPublicId?: Array<string>, includedUserTypes?: number, includedUserStatuses?: UserStatusFlags): CancelablePromise<Array<UserAccessQueryResponse>>;
    /**
     * /user/access/delete
     * Removes access for a user to a program or institution.
     * @param vendorId Either a vendor-id or a sponsor-id is required.  The unique database identifier of the vendor.
     * @param sponsorId The unique database identifier of the sponsor.
     * @param programId Either program-id or program-institution-id is required. The unique program identifier provided as part of configuration. If supplied, users with access to the requested programs will be removed.
     * @param programInstitutionId The program's unique identifier of an institution. If supplied, users with access to the requested institutions will be removed.
     * @param userId One of the following three User IDs are required. The unique ITS database identifier of the user. Multiple supported.
     * @param programUserSystemId The program's system-generated unique identifier of the user. Used to link the ITS system with a program's system for SSO and system-to-system imports.
     * @param programUserPublicId The program's public identifier of a user. For example, the user's Board ID.
     * @returns UserAccessDeleteResponse OK
     * @throws ApiError
     */
    static deleteUserAccess(vendorId?: number, sponsorId?: number, programId?: Array<number>, programInstitutionId?: Array<string>, userId?: Array<number>, programUserSystemId?: Array<string>, programUserPublicId?: Array<string>): CancelablePromise<Array<UserAccessDeleteResponse>>;
}
//# sourceMappingURL=UserAccessService.d.ts.map