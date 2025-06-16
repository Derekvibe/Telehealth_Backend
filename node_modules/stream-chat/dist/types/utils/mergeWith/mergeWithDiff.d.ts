import type { DiffNode, MergeWithCustomizer } from './mergeWithCore';
export declare function mergeWithDiff<T extends object>(target: T, source: object | object[], customizer?: MergeWithCustomizer<T>): {
    result: T;
    diff: DiffNode;
};
