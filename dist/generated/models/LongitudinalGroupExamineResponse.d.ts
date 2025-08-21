export type LongitudinalGroupExamineResponse = {
    /**
     * The database identifier of the longitudinal group.
     */
    'longitudinal-group-id'?: number;
    /**
     * The name of the longitudinal group.
     */
    'longitudinal-group-name'?: string | null;
    /**
     * The unique database identifier of the examinee.
     */
    'examinee-id'?: number;
    /**
     * The program's public or business identifier of the examinee.
     */
    'program-examinee-public-id'?: string | null;
    /**
     * The program's system identifier of the examinee.
     */
    'program-examinee-system-id'?: string | null;
    /**
     * The status of the examinee in the longitudinal group. Possible values: skipped-not-found, skipped-no-changes, skipped-exists, created, updated, deleted, not-able-to-delete-records-linked, skipped-linked-results, inactivated-results-linked, inactivated.
     */
    status?: string | null;
};
//# sourceMappingURL=LongitudinalGroupExamineResponse.d.ts.map