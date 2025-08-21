/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Authorization } from './Authorization';
export type EventAuthorization = {
    /**
     * Unique database identifier for the event. Must be used for subsequent calls to `event/authorizations/query` or `event/close`.
     */
    'event-id'?: number | null;
    /**
     * Unique textual identifier for the event.
     */
    'event-description'?: string | null;
    /**
     * Collection of authorizations.
     */
    authorizations?: Array<Authorization> | null;
};

