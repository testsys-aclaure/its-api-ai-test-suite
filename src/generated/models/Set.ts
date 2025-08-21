/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * A form set under a Pretest Reference Identifier
 */
export type Set = {
    /**
     * Name of the Form Set/Item
     */
    name: string;
    /**
     * Pretest group the Form Set/Item is under
     */
    'pretest-group'?: string | null;
    /**
     * If true, this means the set/item is active and can be used as part of a Pretest.
     */
    active?: boolean;
};

