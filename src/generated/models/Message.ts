/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Message = {
    /**
     * Unique record identifier for each message sent.
     */
    'message-id'?: number;
    /**
     * Program ID of the examinee that the email was sent to.
     */
    'program-id'?: number;
    /**
     * ITS Unique ID of the examinee
     */
    'examinee-id'?: number;
    /**
     * The program’s system identifier of the examinee.
     */
    'program-examinee-system-id'?: string | null;
    /**
     * The program’s public or business identifier of the examinee.
     */
    'program-examinee-public-id'?: string | null;
    /**
     * The ID type of message sent.
     */
    'message-type-id'?: number;
    /**
     * The ID of the type of device the message was sent from
     */
    'send-type-id'?: number;
    /**
     * Email address of the examinee (email only)
     */
    'to-email'?: string | null;
    /**
     * Description of the TO email address used. (email only)
     */
    'to-description'?: string | null;
    /**
     * From Address used when sending emails. (email only)
     */
    'from-email'?: string | null;
    /**
     * Description of the FROM email address used. (email only)
     */
    'from-description'?: string | null;
    /**
     * ReplyTo Address that was used when sending emails (email only)
     */
    'to-reply'?: string | null;
    /**
     * Phone number the SMS message was sent to. (SMS message only)
     */
    'phone-number'?: string | null;
    /**
     * Subject text of the email message
     */
    subject?: string | null;
    /**
     * HTML or Text content of the email or text message.
     */
    'message-content'?: string | null;
    /**
     * Date and time the message record was created in UTC
     */
    'create-utc'?: string;
    /**
     * Date and time the message was sent in UTC.
     */
    'sent-utc'?: string;
    /**
     * Date and time the email service replied with a response.  If not set, then service has not notified us whether message has successfully been sent.
     */
    'service-response-utc'?: string;
    /**
     * Delivery/Delivered/Sent status for a successfully sent message, everything else will be the error status sent from the service.
     */
    'status-message'?: string | null;
};

