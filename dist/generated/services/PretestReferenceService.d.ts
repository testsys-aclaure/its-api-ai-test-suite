import type { PretestReferences } from '../models/PretestReferences';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class PretestReferenceService {
    /**
     * /test/pretest-references/query
     * Gets a Pretest References object according to the specified TestIDs.
     * @param programId
     * @param testId
     * @returns PretestReferences OK
     * @throws ApiError
     */
    static testPretestReferencesQuery(programId: number, testId?: Array<number>): CancelablePromise<PretestReferences>;
    /**
     * /test/pretest-references/import
     * Imports Pretest Reference objects into the database from the Pretest References object passed in. A 422 error is returned if 1 or more items or sets are not matched up before importing and the whole import is cancelled.
     * @param programId
     * @param testId
     * @param requestBody
     * @returns string OK
     * @throws ApiError
     */
    static testPretestReferencesImport(programId: number, testId: number, requestBody: PretestReferences): CancelablePromise<string>;
}
//# sourceMappingURL=PretestReferenceService.d.ts.map