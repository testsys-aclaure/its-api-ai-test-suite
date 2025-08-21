/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type VideoData = {
    /**
     * The unique identifier of the video.
     */
    'video-id'?: number;
    /**
     * If `true`, the video was flagged as suspicious. The video may contain evidence of cheating.
     */
    flagged?: boolean;
    /**
     * The url to retrieve a video. If `url-available-hours` is passed, the URL will expire within the value specified in the `url-available-hours` input parameter.
     */
    url?: string | null;
    /**
     * The date and time the video recording started.
     */
    'start-utc'?: string | null;
    /**
     * The date and time the video recording ended.
     */
    'end-utc'?: string | null;
    /**
     * The sequence of the video recording across all video recordings for the examinee within the session.
     */
    sequence?: number;
};

