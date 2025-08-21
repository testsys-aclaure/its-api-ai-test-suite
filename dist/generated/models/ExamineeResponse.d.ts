export type ExamineeResponse = {
    /**
     * The unique ITS database identifier of the examinee.
     */
    'examinee-id'?: number;
    /**
     * The program's system identifier of the examinee.
     */
    'program-examinee-system-id'?: string | null;
    /**
     * The program's public or business identifier of the examinee.
     */
    'program-examinee-public-id'?: string | null;
    /**
     * The delete status of the examinee. Possible values: `deleted`, `skipped-linked-results`.
     */
    status?: string | null;
};
//# sourceMappingURL=ExamineeResponse.d.ts.map