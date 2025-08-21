/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * The object containing error information.
 */
export type Error1 = {
    /**
     * Unique record identifier for each Secure Browser Error.
     */
    'sb-error-id': number;
    /**
     * The customer’s unique Institution Code.
     */
    'program-institution-id'?: string | null;
    /**
     * Customer’s unique registration identifier.
     */
    'external-registration-id'?: string | null;
    /**
     * Agent Identifier of the Secure Browser.
     */
    'agent-id'?: string | null;
    /**
     * Name of the process causing the error.
     */
    'process-name'?: string | null;
    /**
     * The date and time in UTC of the error recorded.
     */
    'error-utc'?: string;
    /**
     * The number representing the error type.
     */
    'error-type'?: number;
    /**
     * The number representing the error list type.
     */
    'error-list'?: number;
    /**
     * State of the browser.
     */
    'browser-state'?: number;
    /**
     * Internal IP address of the machine running the Secure Browser.
     */
    'ip-address'?: string | null;
    /**
     * Secure Browser version that was used.
     */
    'version-id'?: string | null;
};

