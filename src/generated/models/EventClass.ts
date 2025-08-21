/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type EventClass = {
    /**
     * Unique event class identifier.
     */
    'event-class-id'?: number | null;
    /**
     * Unique event identifier.
     */
    'event-id'?: number | null;
    /**
     * The program institution’s name.
     */
    'program-institution-id'?: string | null;
    /**
     * The description of the event class.
     */
    description?: string | null;
    /**
     * The period of the class.
     */
    period?: number | null;
    /**
     * UTC date of creating the class.
     */
    'create-utc'?: string | null;
    /**
     * UTC date of modifying the class.
     */
    'modify-utc'?: string | null;
    /**
     * Program unique identifier for the event class.
     */
    'program-class-code'?: string | null;
};

