/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RawToScaleMapping } from './RawToScaleMapping';
export type Group = {
    description?: string | null;
    groupName?: string | null;
    groupType?: number | null;
    numPretest?: number | null;
    numQuestions?: number | null;
    passMethodId?: number | null;
    rawCutScore?: number | null;
    rawMaxScore?: number | null;
    rawMinScore?: number | null;
    rawScoreCalculationId?: number | null;
    reportingGroupOptions?: number | null;
    scaledCutScore?: number | null;
    scaledMaxScore?: number | null;
    scaledMinScore?: number | null;
    scalingMethodId?: number | null;
    scalingPrecision?: number | null;
    scalingRoundingMethodId?: number | null;
    sortOrder?: number | null;
    weight?: number | null;
    rawToScaleMappings?: Array<RawToScaleMapping> | null;
};

