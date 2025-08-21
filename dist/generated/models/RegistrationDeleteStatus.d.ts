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
//# sourceMappingURL=RegistrationDeleteStatus.d.ts.map