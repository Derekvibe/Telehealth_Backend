/**
 * A cache that stores a fixed number of values in a queue.
 * The most recently added or retrieved value is kept at the front of the queue.
 * @template K - The type of the keys.
 * @template T - The type of the values.
 */
export declare class FixedSizeQueueCache<K, T> {
    private keys;
    private size;
    private map;
    private dispose;
    constructor(size: number, options?: {
        dispose: (key: K, value: T) => void;
    });
    /**
     * Adds a new or moves the existing reference to the front of the queue
     * @param key
     * @param value
     */
    add(key: K, value: T): void;
    /**
     * Retrieves the value by key.
     * @param key
     */
    peek(key: K): T | undefined;
    /**
     * Retrieves the value and moves it to the front of the queue.
     * @param key
     */
    get(key: K): T | undefined;
}
