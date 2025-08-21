/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Clones } from './Clones';
import type { Error } from './Error';
import type { Forfeited } from './Forfeited';
import type { Pretest } from './Pretest';
import type { Primary } from './Primary';
import type { Retries } from './Retries';
import type { Scored } from './Scored';
import type { Skipped } from './Skipped';
import type { Total } from './Total';
import type { Unscored } from './Unscored';
export type LongitudinalGroupSegmentSyllabus = {
    errors?: Error;
    /**
     * The type of group.  Valid Values: 1 - Cycle, 2 - Run, 3 - Segment
     */
    type?: number | null;
    clones?: Clones;
    pretest?: Pretest;
    primary?: Primary;
    retries?: Retries;
    scored?: Scored;
    skipped?: Skipped;
    total?: Total;
    unscored?: Unscored;
    forfeited?: Forfeited;
};

