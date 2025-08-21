/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type RegistrationDeleteStatus = {
    /**
     * The unique ITS database identifier of the registration.
     */
    'registration-id'?: number;
    /**
     * The unique program identifier of the registration.
     */
    'program-registration-id'?: string | null;
    /**
     * The delete status of the remote session. Possible values: deleted, skipped-has-results.
     */
    status?: string | null;
};

