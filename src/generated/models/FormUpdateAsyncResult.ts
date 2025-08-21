/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type FormUpdateAsyncResult = {
    /**
     * The unique ITS database identifier of the form.
     */
    'form-id'?: number;
    /**
     * The unique textual identifier of the form.
     */
    'form-name'?: string | null;
    /**
     * The update status of the form. Possible values: updated, skipped–no-changes.
     */
    status: string | null;
};

