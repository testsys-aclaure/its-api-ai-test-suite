/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Property1 } from './Property1';
import type { Segment } from './Segment';
import type { Variable } from './Variable';
export type StartTestDelivery = {
    /**
     * The unique identifier for the form.
     */
    'form-id'?: number | null;
    /**
     * The unique textual identifier of the test. Required if `product-code` is not supplied.
     */
    'test-name'?: string | null;
    /**
     * The unique form name. If this is not provided, the form is automatically selected. If this is provided, the form is validated to ensure it is active and authorized.
     */
    'form-name'?: string | null;
    /**
     * Forms may be linked one or more groups.  If specified, then form selection will only match forms that are linked to the form-group passed in.
     */
    'form-group'?: string | null;
    /**
     * Used in two ways. First, delivery groups can be linked to a pretest group. At delivery time, all delivery groups with a pretest-group reference are ignored if this pretest-group parameter on start does not match. Second, delivery groups can be linked to a pretest reference, which is dynamically used to match pretest items or sets managed outside of the test definition. When set on the delivery group, the delivery software will query the pretest references for items or sets that match the reference identifier and this pretest-group. If the pretest group is not passed in on start, then the delivery software will query for pretest references that match the reference identifier and are not linked to a pretest group. See the web service interface for managing pretest references for more information.
     */
    'pretest-group'?: string | null;
    /**
     * The unique textual identifier of the product to deliver.
     */
    'product-code'?: string | null;
    /**
     * The three-letter ISO language code. For multi-language tests, this is the code for the starting test language.
     */
    language?: string | null;
    /**
     * If timing is enabled and configured, this factor will be multiplied against the time set on all breaks.  For instance, “2” would provide double time on every break.  Break factor of 0 turns off the timing.  If not set, then time-factor will be used as the factor on breaks.
     */
    'break-factor'?: number | null;
    /**
     * The number of minutes allowed for break time.  Replaces test configuration with shared break time.  This value is not modified by break-factor if also passed in.
     */
    'break-minutes'?: number | null;
    /**
     * If the test is timed, this number will be multiplied against each element that is timed, including overall time, section times, and item times. For instance, a “3” would give the examinee triple time. 1 = no change, this is the default. 0 = ignore timing, the test is untimed.
     */
    'time-factor'?: number | null;
    /**
     *
     * In pipe delimited format for the following categories, in seconds.  Categories are all optional.  So, if timing was set for discrete items only, it might look like this: “30||60”.  This timing overrides test configuration for questions.  This is the only way to set timing for retries, pre-question dialogs, post-question surveys, and critique.  Categories:
     *
     * ·          Question - Discrete
     *
     * ·          Question - Set (any group with a reading or an article)
     *
     * ·          Question Retry- Discrete
     *
     * ·          Question Retry- Set
     *
     * ·          Post-question survey
     *
     *
     */
    'timing-defaults'?: string | null;
    /**
     * The software will compare this value to the overall time of the test, and calculate a time-factor that affects all timed areas including items.  Ignored if time-factor passed in.
     */
    'time-minutes-adjustment'?: number | null;
    /**
     * ?? Not supported
     */
    'time-extension'?: number | null;
    /**
     * The bit flag that enables test delivery options. See options in Appendix A.
     */
    options?: number | null;
    /**
     * The bit flag that allows test- or item-configured options to be overridden. See overrides in Appendix B.
     */
    overrides?: number | null;
    /**
     * When an examinee completes a test, this URL is called. This URL closes the secure browser if one is used.
     */
    'complete-url'?: string | null;
    /**
     * When an examinee pauses a test, this URL is called. This URL closes the secure browser if one is used.
     */
    'pause-url'?: string | null;
    /**
     * API-related errors navigate to this URL. If this is not provided, a built-in error page is used.
     */
    'error-url'?: string | null;
    /**
     * The table below includes the possible values for this parameter.
     * **Enforce Secure Browser**
     *
     * | Value | Description                                                            |
     * |-------|------------------------------------------------------------------------|
     * | 0     | Do not enforce the use of the ITS Secure Browser. This is the default. |
     * | 1     | Enforce the use of the ITS Secure Browser.                             |
     *
     */
    'enforce-secure-browser'?: boolean | null;
    /**
     * If a secure browser is required and if the API call is not made within a secure browser or app, this URL is called.
     */
    'secure-browser-error-url'?: string | null;
    /**
     * Enumeration. Provided from ITS. A default value is set if not provided.
     */
    'delivery-model-id'?: number | null;
    /**
     * The unique external identifier of the registration.
     */
    'external-registration-id'?: string | null;
    /**
     * The unique external identifier of the center delivering the test.
     */
    'external-center-id'?: string | null;
    /**
     * Unique external identifier of the order.
     */
    'external-order-id'?: string | null;
    /**
     * Unique external identifier of the session.
     */
    'external-session-id'?: string | null;
    /**
     * Station identifier.
     */
    'station-id'?: string | null;
    /**
     * Used to ensure that third party remote proctoring system is running correctly.  Test will stop if process is not running at any point during test delivery.
     */
    'process-name'?: string | null;
    /**
     * Test will stop if process-name is not process-id during test startup.
     */
    'process-id'?: string | null;
    /**
     * Test will stop if process-name does not have the hashed process-hash.
     */
    'process-hash'?: string | null;
    /**
     * Used for multi-segment delivery only.  Sent for multi-segment exams or exams that are delivered in multiple segments in a segment (for instance, a morning session and an afternoon session).  A collection of "segments" must be included for first segment started (which does not need to be the first segment), which will be used to define the test definition (this collection is only used for the initial start of the test).  At the time the test is started, normal random selection and ordering will be performed (if configured).  Once the order of delivery groups and questions and selection of pretest has been completed, the delivery software will break the delivery up across multiple segments based on the collection of segments that is passed in.
     */
    segment?: number | null;
    /**
     * The unique database identifier of the event.
     */
    'event-id'?: number | null;
    /**
     * Used for multi-segment delivery only.  A segments array is provided for multi-segment exams to define how to divide the test definition over the multiple segment period.  The segments array is only considered on the first launch of the test, and is used in conjunction with the segment parameter. While a form may consist of N sections, it is not required that all sections be included.  For instance, the segments can be limited to just section 3 of a form.
     */
    segments?: Array<Segment> | null;
    /**
     * A variables array is provided to the UI and can be used to pass customization information to the user interface.  The variables array must be sent for each start.
     */
    variables?: Array<Variable> | null;
    /**
     * Properties are passed through to result xml/json. Properties are converted to XML for Result XML.
     */
    'pass-through-properties'?: Array<Property1> | null;
};

