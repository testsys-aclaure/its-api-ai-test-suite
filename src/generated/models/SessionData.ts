/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EventData } from './EventData';
import type { VideoData } from './VideoData';
export type SessionData = {
    /**
     * The internal database identifier of the examinee.
     */
    'examinee-id'?: number;
    /**
     * The public identifier of the examinee. For example, a student identifier. Returned if available.
     */
    'program-examinee-public-id'?: string | null;
    /**
     * The external system identifier for the examinee. This is typically a database identifier. Returned if available.
     */
    'program-examinee-system-id'?: string | null;
    /**
     * Collection of videos.
     */
    videos?: Array<VideoData> | null;
    /**
     * A URL that will return a JSON object containing the chat messages between a proctor and examinee during a remote proctor session. If `url-available-hours` is passed, the URL will expire within the value specified in the `url-available-hours` input parameter.
     */
    'chat-log-url'?: string | null;
    /**
     * A URL returning the photo of the examinee taken during remote proctor check-in. If `url-available-hours` is passed, the URL will expire within the value specified in the `url-available-hours` input parameter.
     */
    'photo-url'?: string | null;
    'photo-id-front-url'?: string | null;
    'photo-id-back-url'?: string | null;
    /**
     * Collection of events that were logged for the session.
     */
    events?: Array<EventData> | null;
};

