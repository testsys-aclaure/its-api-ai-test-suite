/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Represents an event for an examinee.
 */
export type EventResponse1 = {
    /**
     * The unique ITS database identifier of the event.
     */
    'event-id': number;
    /**
     * The description of the event.
     */
    description?: string | null;
    /**
     * The table below contains the possible event-status-id values:
     *
     * | Event Status ID | Description                                                     |
     * | --------------- | --------------------------------------------------------------- |
     * | 1 (Inactive)    | Available for editing only.  Not available for delivery.        |
     * | 2 (Active)      | Available for delivery.                                         |
     * | 3 (Closed)      | Available for reporting only.                                   |
     *
     */
    'event-status-id': number;
    /**
     * The date and time the event is available for delivery in UTC.
     */
    'start-utc'?: string | null;
    /**
     * The date and time the event is no longer available for delivery in UTC.
     */
    'end-utc'?: string | null;
    /**
     * The date and time the event was closed, and reporting became available.
     */
    'close-utc'?: string | null;
    /**
     * The last user to modify event configuration.
     */
    'modify-user-id': number;
    /**
     * The last date and time the event configuration was modified in UTC.
     */
    'modify-utc': string;
};

