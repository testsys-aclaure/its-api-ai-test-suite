import type { FormReportQueryResult } from '../models/FormReportQueryResult';
import type { CancelablePromise } from '../core/CancelablePromise';
export declare class FormsService {
    /**
     * form/reports/query
     * This method returns the form reporting data for a specific form.
     * @param programId
     * @param testId
     * @param formId
     * @returns FormReportQueryResult OK
     * @throws ApiError
     */
    static getFormReportsQuery(programId: number, testId: number, formId: number): CancelablePromise<FormReportQueryResult>;
    /**
     * form/res-files/query
     * This method returns the binary encrypted RES file for a specific form.
     * @param programId
     * @param formId
     * @returns binary OK
     * @throws ApiError
     */
    static getFormResFilesQuery(programId: number, formId: number): CancelablePromise<Blob>;
}
//# sourceMappingURL=FormsService.d.ts.map