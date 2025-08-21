/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Item } from './Item';
import type { Set } from './Set';
/**
 * Information for single Pretest Reference
 */
export type PretestReference = {
    /**
     * Unique Identifier for the items or sets being updated, associated with a FormQuestionID or FormSetID.
     */
    identifier?: string;
    /**
     * List of items that belong to this identifier.
     */
    items?: Array<Item> | null;
    /**
     * List of form sets that belong to this identifier.
     */
    sets?: Array<Set> | null;
};

