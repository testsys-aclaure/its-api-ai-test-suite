/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Segment = {
    /**
     * Each segment must be specified in sequential order.
     */
    'segment-number'?: number | null;
    /**
     * If specified, then a timing block will be inserted around the segment's questions (outside of introduction displays) with this period for this segment.  If 0 is specified, then no overall timing will be enforced.  And if max-minutes is not passed in, then max-minutes will be set to the number of minutes based on the timed sections and groups within the segment, plus the break-minutes.
     */
    'max-minutes'?: number | null;
    /**
     * If specified, then this value will be used for break-minutes for this segment.  If not set, then the software will calculate the percentage of time allocated to this segment compared to all other segments, and set the break-minutes to the that percentage of the value set on the overall test.
     */
    'break-minutes'?: number | null;
    /**
     * Number from 1 to n where n is equal to or less than the number of sections in the test. This value specifies the starting section that will be delivered within this segment.  For the purpose of this parameter, a section is defined as a "DeliveryGroup" in the form specification of type 1 (standard section).
     */
    'start-delivery-section'?: number | null;
    /**
     * Number from 1 to n where n is equal to or less than the number of sections in the test. This value specifies the ending section that will be delivered within this segment. For the purpose of this parameter, a section is defined as a "DeliveryGroup" in the form specification of type 1 (standard section).  If not specified, then segment will be delivered to the end of test. This number can be the same as the start-delivery-section, which would be true in the case of a one section segment.  Sections can only be referenced in one segment.  For instance, you can not have a segment spanning 2-4 and 3-5 because sections 3 and 4 are referenced in two segments.
     */
    'end-delivery-section'?: number | null;
};

