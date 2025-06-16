export declare const DEFAULT_QUERY_CHANNELS_MESSAGE_LIST_PAGE_SIZE = 25;
export declare const DEFAULT_QUERY_CHANNEL_MESSAGE_LIST_PAGE_SIZE = 100;
export declare const DEFAULT_MESSAGE_SET_PAGINATION: {
    hasNext: boolean;
    hasPrev: boolean;
};
export declare const DEFAULT_UPLOAD_SIZE_LIMIT_BYTES: number;
export declare const API_MAX_FILES_ALLOWED_PER_MESSAGE = 10;
export declare const MAX_CHANNEL_MEMBER_COUNT_IN_CHANNEL_QUERY = 100;
export declare const RESERVED_UPDATED_MESSAGE_FIELDS: {
    readonly created_at: true;
    readonly deleted_at: true;
    readonly pinned_at: true;
    readonly updated_at: true;
    readonly command: true;
    readonly mentioned_users: true;
    readonly quoted_message: true;
    readonly latest_reactions: true;
    readonly own_reactions: true;
    readonly reaction_counts: true;
    readonly reply_count: true;
    readonly i18n: true;
    readonly type: true;
    readonly html: true;
    readonly __html: true;
    readonly user: true;
};
export declare const LOCAL_MESSAGE_FIELDS: {
    readonly error: true;
};
export declare const DEFAULT_QUERY_CHANNELS_RETRY_COUNT = 3;
export declare const DEFAULT_QUERY_CHANNELS_MS_BETWEEN_RETRIES = 1000;
