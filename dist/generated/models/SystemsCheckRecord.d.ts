export type SystemsCheckRecord = {
    /**
     * The unique identifier of the system check.
     */
    'system-check-id'?: number;
    /**
     * The date and time the check was initiated.
     */
    'created-utc'?: string;
    /**
     * The browser or rendering engine used when the check was completed.
     */
    browser?: string | null;
    /**
     * Browser version of browser (or rendering engine) used
     */
    'browser-version'?: string | null;
    /**
     * The webkit version of the browser.
     */
    'webkit-version'?: string | null;
    /**
     * The operating system used for the check.
     */
    'operating-system'?: string | null;
    /**
     * The WAN IP of the network connection.
     */
    'ip-address'?: string | null;
    /**
     * The agent string of the browser used.
     */
    'agent-string'?: string | null;
    /**
     * If true, the check was completed inside a secure browser or app.
     */
    'is-secure-browser'?: boolean;
    /**
     * Version of the secure browser if used
     */
    'secure-browser-version'?: string | null;
    /**
     * Identifier of the secure browser found in the agent string
     */
    'secure-browser-identifier'?: string | null;
    /**
     * Detected network upload speed
     */
    'upload-speed-kbps'?: number;
    /**
     * Detected network download speed
     */
    'download-speed-kbps'?: number;
    /**
     * If true, the examinee used the ITS Remote Proctor Connect mobile app as part of the system check.
     */
    'mobile-app-used'?: boolean;
    /**
     * If true, the network was able to connect to the streaming servers. If not returned, the check was not performed.
     */
    'passed-aws-check'?: boolean;
    /**
     * If true, the examinee indicated they were able to hear sound. If not returned, the check was not performed.
     */
    'passed-speaker-check'?: boolean;
    /**
     * If true, the audible input was detected from the microphone. If not returned, the check was not performed.
     */
    'passed-microphone-check'?: boolean;
    /**
     * If true, access to the camera was granted. If not returned, the check was not performed.
     */
    'passed-camera-check'?: boolean;
    /**
     * If true, the user’s stream was able to be successfully played back. If not returned, the check was not performed.
     */
    'passed-stream-check'?: boolean;
    /**
     * If true, all checks passed. If not returned, not all checks were completed.
     */
    'passed-all-checks'?: boolean;
};
//# sourceMappingURL=SystemsCheckRecord.d.ts.map