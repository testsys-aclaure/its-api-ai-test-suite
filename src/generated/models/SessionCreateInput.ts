/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SessionCreateInput = {
    /**
     * The program's unique identifier
     */
    'program-id'?: number;
    /**
     * The program’s name for the institution that is referenced
     */
    'program-institution-id'?: string | null;
    /**
     * The unique identifier of the remote session. This parameter is required to update a remote session.
     */
    'session-code'?: string | null;
    /**
     * The ITS database identifier for the Event.
     */
    'event-id'?: number | null;
    /**
     * The description of the session. This is displayed in the user interface for proctors.
     */
    description?: string | null;
    /**
     * The start date and time of the session in UTC.
     */
    'start-utc'?: string | null;
    /**
     * The end date and time of the session in UTC.
     */
    'end-utc'?: string | null;
    /**
     * Designate a single subject to restrict test delivery in the session to only those tests associated with the matching subject. Subject must exist and be linked to one or more tests via products.
     */
    subject?: string | null;
    /**
     * Options for the session's score reports:
     * 0: None
     * 1: Without Review
     * 2: Review without solutions
     * 3: eview with solutions(correct/incorrect displayed)
     */
    'score-report-options'?: number | null;
};

