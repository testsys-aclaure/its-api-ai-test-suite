/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Program } from './Program';
/**
 * A sponsor a user can access.
 */
export type Sponsor = {
    /**
     * The unique database identifier of the sponsor.
     */
    'sponsor-id': number;
    /**
     * The name of the sponsor.
     */
    'sponsor-name': string | null;
    /**
     * A collection of programs within the sponsor the user can access.
     */
    readonly programs?: Array<Program> | null;
};

