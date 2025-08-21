/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type EventData = {
    'category-id'?: number | null;
    /**
     * Comments logged by the remote proctor.
     */
    comment?: string | null;
    /**
     * System identifier of the video that the event was recorded for.
     */
    'video-id'?: number | null;
    /**
     * Number of seconds into the video where the event happened.
     */
    'segment-anchor'?: number | null;
};

