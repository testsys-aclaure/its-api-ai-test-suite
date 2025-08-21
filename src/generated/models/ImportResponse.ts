/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImportResponseDetail } from './ImportResponseDetail';
import type { ImportResponseError } from './ImportResponseError';
/**
 * Item Workshop Import response for a single, synchronous call.
 */
export type ImportResponse = {
    /**
     * The unique ITS database identifier of the import.
     */
    'import-id'?: number;
    /**
     * The unique ITS database identifier of the bank provided as part of configuration.
     */
    'bank-id'?: number;
    /**
     * The format of this import.
     */
    'import-format': string;
    /**
     * The unique database identifier of the folder where data was imported.
     */
    'folder-id': number;
    /**
     * The date and time this import call started.
     */
    'start-utc': string;
    /**
     * The date and time this import call completed.
     */
    'end-utc': string;
    /**
     * Details about each file imported.
     */
    details: Array<ImportResponseDetail>;
    /**
     * Collection of errors from the import.
     */
    errors?: Array<ImportResponseError> | null;
};

