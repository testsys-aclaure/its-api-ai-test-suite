export type RegistrationUpdateResponse = {
    /**
     * ITS database unique identifier for the registration.
     */
    'registration-id'?: number | null;
    /**
     * Program’s registration name.
     */
    'program-registration-id'?: string | null;
    /**
     * The unique ITS database identifier of the examinee.
     */
    'examinee-id'?: number | null;
    /**
     * The update status of the remote session. Possible values: skipped-exists, skipped-not-found, and updated
     */
    status?: string | null;
};
//# sourceMappingURL=RegistrationUpdateResponse.d.ts.map