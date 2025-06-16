/**
 * Runs async functions serially. Useful for wrapping async actions that
 * should never run simultaneously: if marked with the same tag, functions
 * will run one after another.
 *
 * @param tag Async functions with the same tag will run serially. Async functions
 * with different tags can run in parallel.
 * @param cb Async function to run.
 * @returns Promise that resolves when async functions returns.
 */
export declare const withoutConcurrency: <T>(tag: string | symbol, cb: () => Promise<T>) => Promise<T>;
/**
 * Runs async functions serially, and cancels all other actions with the same tag
 * when a new action is scheduled. Useful for wrapping async actions that override
 * each other (e.g. enabling and disabling camera).
 *
 * If an async function hasn't started yet and was canceled, it will never run.
 * If an async function is already running and was canceled, it will be notified
 * via an abort signal passed as an argument.
 *
 * @param tag Async functions with the same tag will run serially and are canceled
 * when a new action with the same tag is scheduled.
 * @param cb Async function to run. Receives AbortSignal as the only argument.
 * @returns Promise that resolves when async functions returns. If the function didn't
 * start and was canceled, will resolve with 'canceled'. If the function started to run,
 * it's up to the function to decide how to react to cancelation.
 */
export declare const withCancellation: <T>(tag: string | symbol, cb: (signal: AbortSignal) => Promise<T | "canceled">) => Promise<T | "canceled">;
export declare function hasPending(tag: string | symbol): boolean;
export declare function settled(tag: string | symbol): Promise<void>;
