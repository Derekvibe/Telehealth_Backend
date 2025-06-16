export type Patch<T> = (value: T) => T;
export type ValueOrPatch<T> = T | Patch<T>;
export type Handler<T> = (nextValue: T, previousValue: T | undefined) => void;
export type Unsubscribe = () => void;
export type RemovePreprocessor = Unsubscribe;
export type Preprocessor<T> = Handler<T>;
export declare const isPatch: <T>(value: ValueOrPatch<T>) => value is Patch<T>;
export declare class StateStore<T extends Record<string, unknown>> {
    protected value: T;
    protected handlers: Set<Handler<T>>;
    protected preprocessors: Set<Preprocessor<T>>;
    constructor(value: T);
    /**
     * Allows merging two stores only if their keys differ otherwise there's no way to ensure the data type stability.
     * @experimental
     * This method is experimental and may change in future versions.
     */
    merge<Q extends StateStore<any>>(stateStore: Q extends StateStore<infer L> ? Extract<keyof T, keyof L> extends never ? Q : never : never): MergedStateStore<T, Q extends StateStore<infer L extends Record<string, unknown>> ? L : never>;
    next(newValueOrPatch: ValueOrPatch<T>): void;
    partialNext: (partial: Partial<T>) => void;
    getLatestValue(): T;
    subscribe(handler: Handler<T>): Unsubscribe;
    subscribeWithSelector: <O extends Readonly<Record<string, unknown>> | Readonly<unknown[]>>(selector: (nextValue: T) => O, handler: Handler<O>) => Unsubscribe;
    /**
     * Registers a preprocessor function that will be called before the state is updated.
     *
     * Preprocessors are invoked with the new and previous values whenever `next` or `partialNext` methods
     * are called, allowing you to mutate or react to the new value before it is set. Preprocessors run in the
     * order they were registered.
     *
     * @example
     * ```ts
     * const store = new StateStore<{ count: number; isMaxValue: bool; }>({ count: 0, isMaxValue: false });
     *
     * store.addPreprocessor((nextValue, prevValue) => {
     *   if (nextValue.count > 10) {
     *     nextValue.count = 10; // Clamp the value to a maximum of 10
     *   }
     *
     *   if (nextValue.count === 10) {
     *     nextValue.isMaxValue = true; // Set isMaxValue to true if count is 10
     *   } else {
     *     nextValue.isMaxValue = false; // Reset isMaxValue otherwise
     *   }
     * });
     *
     * store.partialNext({ count: 15 });
     *
     * store.getLatestValue(); // { count: 10, isMaxValue: true }
     *
     * store.partialNext({ count: 5 });
     *
     * store.getLatestValue(); // { count: 5, isMaxValue: false }
     * ```
     *
     * @param preprocessor - The function to be called with the next and previous values before the state is updated.
     * @returns A `RemovePreprocessor` function that removes the preprocessor when called.
     */
    addPreprocessor(preprocessor: Preprocessor<T>): RemovePreprocessor;
}
/**
 * Represents a merged state store that combines two separate state stores into one.
 *
 * The MergedStateStore allows combining two stores with non-overlapping keys.
 * It extends StateStore with the combined type of both source stores.
 * Changes to either the original or merged store will propagate to the combined store.
 *
 * Note: Direct mutations (next, partialNext, addPreprocessor) are disabled on the merged store.
 * You should instead call these methods on the original or merged stores.
 *
 * @template O The type of the original state store
 * @template M The type of the merged state store
 *
 * @experimental
 * This class is experimental and may change in future versions.
 */
export declare class MergedStateStore<O extends Record<string, unknown>, M extends Record<string, unknown>> extends StateStore<O & M> {
    readonly original: StateStore<O>;
    readonly merged: StateStore<M>;
    private cachedOriginalValue;
    private cachedMergedValue;
    constructor({ original, merged }: {
        original: StateStore<O>;
        merged: StateStore<M>;
    });
    /**
     * Subscribes to changes in the merged state store.
     *
     * This method extends the base subscribe functionality to handle the merged nature of this store:
     * 1. The first subscriber triggers registration of helper subscribers that listen to both source stores
     * 2. Changes from either source store are propagated to this merged store
     * 3. Source store values are cached to prevent unnecessary updates
     *
     * When the first subscriber is added, the method sets up listeners on both original and merged stores.
     * These listeners update the combined store value whenever either source store changes.
     * All subscriptions (helpers and the actual handler) are tracked so they can be properly cleaned up.
     *
     * @param handler - The callback function that will be executed when the state changes
     * @returns An unsubscribe function that, when called, removes the subscription and any helper subscriptions
     */
    subscribe(handler: Handler<O & M>): () => void;
    /**
     * Retrieves the latest combined state from both original and merged stores.
     *
     * This method extends the base getLatestValue functionality to ensure the merged store
     * remains in sync with its source stores even when there are no active subscribers.
     *
     * When there are no handlers registered, the method:
     * 1. Fetches the latest values from both source stores
     * 2. Compares them with the cached values to detect changes
     * 3. If changes are detected, updates the internal value and caches
     *    the new source values to maintain consistency
     *
     * This approach ensures that calling getLatestValue() always returns the most
     * up-to-date combined state, even if the merged store hasn't been actively
     * receiving updates through subscriptions.
     *
     * @returns The latest combined state from both original and merged stores
     */
    getLatestValue(): O & M;
    next: () => void;
    partialNext: () => void;
    addPreprocessor(): () => void;
}
