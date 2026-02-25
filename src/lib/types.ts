/**
 * Shared type definitions used across the application
 */

/**
 * Dictionary type for the CMS-driven i18n content.
 * Since content is dynamically loaded from JSON files and can be overridden
 * by database values, we use an indexed type rather than a strict interface.
 * 
 * Future improvement: Generate this type from the JSON files using a build step.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Dictionary = Record<string, any>;

/**
 * Standard action result returned by server actions
 */
export interface ActionResult {
    success: boolean;
    error?: string;
}

/**
 * Action result with data
 */
export interface ActionResultWithData<T> extends ActionResult {
    data?: T;
}
