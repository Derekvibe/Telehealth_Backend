/**
 * Core utility functions and types for mergeWith functionality.
 * This file contains shared logic used by both mergeWith and mergeWithDiff functions.
 */
export type MergeWithCustomizer<T extends object> = (objValue: unknown, srcValue: unknown, key: string | symbol, object: T, source: object, stack: Set<unknown>) => unknown | undefined;
export type PendingMerge = {
    sourceKey: string | symbol;
    parentTarget: object;
    source: object;
    target: object;
};
export type ChangeType = 'added' | 'updated' | 'circular' | (string & {});
export interface DiffNode {
    type?: ChangeType;
    children: Record<string | symbol, DiffNode>;
    value?: unknown;
    oldValue?: unknown;
}
export declare const isClassInstance: (value: unknown) => boolean;
/**
 * Performs a deep comparison between two values to determine if they are equivalent.
 * This is similar to Lodash's isEqual implementation but simplified.
 */
export declare const isEqual: (value1: unknown, value2: unknown, compareStack?: Set<[unknown, unknown]>, objectStack1?: WeakSet<object>, objectStack2?: WeakSet<object>) => boolean;
/**
 * Generates a diff between original and modified objects.
 * This is used after the merge operation to track what has changed.
 */
export declare function generateDiff(original: unknown, modified: unknown): DiffNode | null;
export declare function createMergeCore<T extends object>(options?: {
    trackDiff?: boolean;
}): ({ target, source, customizer, }: {
    target: T;
    source: object | object[];
    customizer?: MergeWithCustomizer<T>;
}) => {
    result: T;
    diff: DiffNode | null;
};
export declare function cleanupDiffTree(diffNode: DiffNode): DiffNode | null;
