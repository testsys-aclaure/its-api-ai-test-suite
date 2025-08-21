/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Item Workshop Import Query response detail object.
 */
export type ImportQueryDetail = {
    /**
     * Item, File, or Form.
     */
    'resource-type': string;
    /**
     * The name of the form.
     */
    'resource-name': string;
    /**
     * The language of the import.
     */
    'resource-language': string;
    /**
     * The version of the resource.
     */
    'resource-version': string;
    /**
     * Added, Updated, Unchanged (Skipped), Error.
     */
    status: string;
};

