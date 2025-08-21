/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EventResponse1 } from './EventResponse1';
/**
 * Examinee Events Response
 */
export type ExamineeEventsResponse = {
    /**
     * The unique program identifier of an institution. Examinees are linked to this institution.  The web API client must have access to this institution.
     */
    'program-institution-id'?: string | null;
    /**
     * The unique ITS database identifier of the examinee.
     */
    'examinee-id': number;
    /**
     * The program�s system identifier of the examinee. This is typically a database identifier. This must be unique within the uniqueness scope defined for the program. This is required for creates if program-examinee-public-id is not provided. This is required for updates if examinee-id and program-examinee-public-id are not provided.
     */
    'program-examinee-system-id'?: string | null;
    /**
     * The program�s public or business identifier of the examinee. For instance, this may be a student ID. This identifier must be unique within the uniqueness scope as defined for the program. This is required for creates if program-examinee-system-id is not provided. This is required for updates if examinee-id and program-examinee-system-id are not provided.
     */
    'program-examinee-public-id'?: string | null;
    /**
     * Collection of events
     */
    readonly events?: Array<EventResponse1> | null;
};

