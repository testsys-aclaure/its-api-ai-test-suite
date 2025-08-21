import type { ExamineeSegments } from './ExamineeSegments';
export type Result = {
    /**
     * The unique ITS database identifier of the longitudinal group.
     */
    'longitudinal-group-id'?: number;
    /**
     * The unique textual identifier of the longitudinal group.
     */
    'longitudinal-group-name'?: string | null;
    /**
     * The description of the longitudinal group.
     */
    'longitudinal-group-Description'?: string | null;
    /**
     * The unique ITS database identifier of the examinee.
     */
    'examinee-id'?: number;
    /**
     * The program's public or business identifier of the examinee. For instance, this may be a student ID. This identifier must be unique within the uniqueness scope as defined for the program. This is required for Creates if `program-examinee-system-id` is not provided. This is required for Updates if `examinee-id` and `program-examinee-system-id` are not provided.
     */
    'program-examinee-public-id'?: string | null;
    /**
     * The program's system identifier of the examinee. This is typically a database identifier. This must be unique within the uniqueness scope defined for the program. This is required for Creates if `program-examinee-public-id` is not provided. This is required for Updates if `examinee-id` and `program-examinee-public-id` are not provided.
     */
    'program-examinee-system-id'?: string | null;
    /**
     * Collection of segments.
     */
    segments?: Array<ExamineeSegments> | null;
};
//# sourceMappingURL=Result.d.ts.map