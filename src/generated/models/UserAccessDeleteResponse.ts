/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Returns the delete status of the user's access to the given `program-id` or `program-institution-id`.
 */
export type UserAccessDeleteResponse = {
    /**
     * The unique ITS database identifier of the user.
     */
    'user-id'?: number | null;
    /**
     * The unique program identifier of the user.
     */
    'program-user-system-id'?: string | null;
    /**
     * The unique program user public identifier of the user.
     */
    'program-user-public-id'?: string | null;
    /**
     * The unique program identifier.
     */
    'program-id'?: number | null;
    /**
     * The unique program institution identifier.
     */
    'program-institution-id'?: string | null;
    /**
     * The delete status of the remote session. Possible values: `deleted`.
     */
    readonly status?: string | null;
};

