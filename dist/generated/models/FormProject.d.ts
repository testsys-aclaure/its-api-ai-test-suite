import type { FormProjectLab } from './FormProjectLab';
import type { FormProjectTask } from './FormProjectTask';
export type FormProject = {
    /**
     * Name of lab.
     */
    name?: string | null;
    /**
     * Sequence of project within form.
     */
    sequence?: number;
    /**
     * Number of tasks within project.
     */
    'num-tasks'?: number;
    /**
     * Number of ALII labs within project.
     */
    'num-alii'?: number;
    /**
     * Number of HTML labs within project.
     */
    'num-html'?: number;
    /**
     * Number of questions linked to project.
     */
    'num-questions'?: number;
    /**
     * Possible values:
     *
     * | Bit Flag                                                        | Bit Value |
     * | --------------------------------------------------------------- | --------- |
     * | 6  = Group all tasks onto one page                              | 32        |
     * | 7  = Display a checkbox for each task                           | 64        |
     * | 8  = Do not allow forward navigation until task(s) are complete | 128       |
     * | 9  = Requires advanced secure browser windowing                 | 256       |
     *
     *
     */
    'item-flags'?: number;
    /**
     * User who created project. Will be notified if ALII scoring sends task names not in project for scoring.
     */
    'create-user-id'?: number;
    /**
     * Last user who modified project. Will be notified if ALII scoring sends task names not in project for scoring.
     */
    'modify-user-id'?: number;
    readonly 'project-tasks'?: Array<FormProjectTask> | null;
    readonly 'project-labs'?: Array<FormProjectLab> | null;
};
//# sourceMappingURL=FormProject.d.ts.map