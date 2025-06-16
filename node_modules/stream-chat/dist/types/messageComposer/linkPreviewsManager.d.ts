import { StateStore } from '../store';
import type { DebouncedFunc } from '../utils';
import type { DraftMessage, LocalMessage, OGAttachment } from '../types';
import type { LinkPreviewsManagerConfig } from './configuration/types';
import type { MessageComposer } from './messageComposer';
export type LinkPreview = OGAttachment & {
    status: LinkPreviewStatus;
};
export interface ILinkPreviewsManager {
    /** Function cancels all the scheduled or in-progress URL enrichment queries and resets the state. */
    cancelURLEnrichment: () => void;
    /** Function that triggers the search for URLs and their enrichment. */
    findAndEnrichUrls?: DebouncedFunc<(text: string) => void>;
}
export declare enum LinkPreviewStatus {
    /** Link preview has been dismissed using **/
    DISMISSED = "dismissed",
    /** Link preview could not be loaded, the enrichment request has failed. **/
    FAILED = "failed",
    /** Link preview has been successfully loaded. **/
    LOADED = "loaded",
    /** The enrichment query is in progress for a given link. **/
    LOADING = "loading",
    /** The preview reference enrichment has not begun. Default status if not set. */
    PENDING = "pending"
}
export type LinkURL = string;
export type LinkPreviewMap = Map<LinkURL, LinkPreview>;
export type LinkPreviewsManagerState = {
    previews: LinkPreviewMap;
};
export type LinkPreviewsManagerOptions = {
    composer: MessageComposer;
    message?: DraftMessage | LocalMessage;
};
export declare class LinkPreviewsManager implements ILinkPreviewsManager {
    findAndEnrichUrls: DebouncedFunc<(text: string) => void>;
    readonly state: StateStore<LinkPreviewsManagerState>;
    readonly composer: MessageComposer;
    private shouldDiscardEnrichQueries;
    constructor({ composer, message }: LinkPreviewsManagerOptions);
    get client(): import("..").StreamChat;
    get channel(): import("..").Channel;
    get previews(): LinkPreviewMap;
    get loadingPreviews(): LinkPreview[];
    get loadedPreviews(): LinkPreview[];
    get dismissedPreviews(): LinkPreview[];
    get failedPreviews(): LinkPreview[];
    get pendingPreviews(): LinkPreview[];
    get config(): LinkPreviewsManagerConfig;
    get debounceURLEnrichmentMs(): LinkPreviewsManagerConfig["debounceURLEnrichmentMs"];
    set debounceURLEnrichmentMs(debounceURLEnrichmentMs: LinkPreviewsManagerConfig['debounceURLEnrichmentMs']);
    get enabled(): LinkPreviewsManagerConfig["enabled"];
    set enabled(enabled: LinkPreviewsManagerConfig['enabled']);
    get findURLFn(): LinkPreviewsManagerConfig["findURLFn"];
    set findURLFn(fn: LinkPreviewsManagerConfig['findURLFn']);
    get onLinkPreviewDismissed(): LinkPreviewsManagerConfig["onLinkPreviewDismissed"];
    set onLinkPreviewDismissed(fn: LinkPreviewsManagerConfig['onLinkPreviewDismissed']);
    initState: ({ message }?: {
        message?: DraftMessage | LocalMessage;
    }) => void;
    private _findAndEnrichUrls;
    cancelURLEnrichment: () => void;
    /**
     * Clears all non-dismissed previews when the text composer is cleared.
     * This ensures that dismissed previews are not re-enriched in the future.
     */
    clearPreviews: () => void;
    updatePreview: (url: LinkURL, preview: Partial<LinkPreview>) => void;
    dismissPreview: (url: LinkURL) => void;
    static previewIsLoading: (preview: LinkPreview) => boolean;
    static previewIsLoaded: (preview: LinkPreview) => boolean;
    static previewIsDismissed: (preview: LinkPreview) => boolean;
    static previewIsFailed: (preview: LinkPreview) => boolean;
    static previewIsPending: (preview: LinkPreview) => boolean;
    static getPreviewData: (preview: LinkPreview) => {
        og_scrape_url: string;
        asset_url?: string;
        author_link?: string;
        author_name?: string;
        image_url?: string;
        text?: string;
        thumb_url?: string;
        title?: string;
        title_link?: string;
        type?: string | "video" | "audio" | "image";
    };
}
