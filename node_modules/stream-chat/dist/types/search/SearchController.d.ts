import { StateStore } from '../store';
import type { MessageResponse } from '../types';
import type { SearchSource } from './BaseSearchSource';
export type SearchControllerState = {
    isActive: boolean;
    searchQuery: string;
    sources: SearchSource[];
};
export type InternalSearchControllerState = {
    focusedMessage?: MessageResponse;
};
export type SearchControllerConfig = {
    keepSingleActiveSource: boolean;
};
export type SearchControllerOptions = {
    config?: Partial<SearchControllerConfig>;
    sources?: SearchSource[];
};
export declare class SearchController {
    /**
     * Not intended for direct use by integrators, might be removed without notice resulting in
     * broken integrations.
     */
    _internalState: StateStore<InternalSearchControllerState>;
    state: StateStore<SearchControllerState>;
    config: SearchControllerConfig;
    constructor({ config, sources }?: SearchControllerOptions);
    get hasNext(): boolean;
    get sources(): SearchSource<any>[];
    get activeSources(): SearchSource<any>[];
    get isActive(): boolean;
    get searchQuery(): string;
    get searchSourceTypes(): Array<SearchSource['type']>;
    addSource: (source: SearchSource) => void;
    getSource: (sourceType: SearchSource["type"]) => SearchSource<any> | undefined;
    removeSource: (sourceType: SearchSource["type"]) => void;
    activateSource: (sourceType: SearchSource["type"]) => void;
    deactivateSource: (sourceType: SearchSource["type"]) => void;
    activate: () => void;
    search: (searchQuery?: string) => Promise<void>;
    cancelSearchQueries: () => void;
    clear: () => void;
    exit: () => void;
}
