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
//# sourceMappingURL=EventData.d.ts.map