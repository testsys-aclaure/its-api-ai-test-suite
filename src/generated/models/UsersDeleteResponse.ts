/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UsersDeleteResponse = {
    /**
     * The unique ITS database identifier of the user.
     */
    'user-id'?: number;
    /**
     * The unique program identifier of the user.
     */
    'program-user-system-id'?: string | null;
    /**
     * The unique program user public identifier of the user.
     */
    'program-user-public-id'?: string | null;
    /**
     * The delete status of the remote session. Possible values: `deleted`.
     */
    readonly status?: string | null;
};

