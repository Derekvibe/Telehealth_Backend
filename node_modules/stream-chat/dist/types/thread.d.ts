import { StateStore } from './store';
import type { AscDesc, LocalMessage, MessagePaginationOptions, MessageResponse, ThreadResponse, UserResponse } from './types';
import type { Channel } from './channel';
import type { StreamChat } from './client';
import type { CustomThreadData } from './custom_types';
import { MessageComposer } from './messageComposer';
import { WithSubscriptions } from './utils/WithSubscriptions';
type QueryRepliesOptions = {
    sort?: {
        created_at: AscDesc;
    }[];
} & MessagePaginationOptions & {
    user?: UserResponse;
    user_id?: string;
};
export type ThreadState = {
    /**
     * Determines if the thread is currently opened and on-screen. When the thread is active,
     * all new messages are immediately marked as read.
     */
    active: boolean;
    channel: Channel;
    createdAt: Date;
    custom: CustomThreadData;
    deletedAt: Date | null;
    isLoading: boolean;
    isStateStale: boolean;
    pagination: ThreadRepliesPagination;
    /**
     * Thread is identified by and has a one-to-one relation with its parent message.
     * We use parent message id as a thread id.
     */
    parentMessage: LocalMessage;
    participants: ThreadResponse['thread_participants'];
    read: ThreadReadState;
    replies: Array<LocalMessage>;
    replyCount: number;
    title: string;
    updatedAt: Date | null;
};
export type ThreadRepliesPagination = {
    isLoadingNext: boolean;
    isLoadingPrev: boolean;
    nextCursor: string | null;
    prevCursor: string | null;
};
export type ThreadUserReadState = {
    lastReadAt: Date;
    unreadMessageCount: number;
    user: UserResponse;
    lastReadMessageId?: string;
};
export type ThreadReadState = Record<string, ThreadUserReadState | undefined>;
export declare const THREAD_RESPONSE_RESERVED_KEYS: Record<keyof ThreadResponse, true>;
export declare class Thread extends WithSubscriptions {
    readonly state: StateStore<ThreadState>;
    readonly id: string;
    readonly messageComposer: MessageComposer;
    private client;
    private failedRepliesMap;
    constructor({ client, threadData, }: {
        client: StreamChat;
        threadData: ThreadResponse;
    });
    get channel(): Channel;
    get hasStaleState(): boolean;
    get ownUnreadCount(): number;
    activate: () => void;
    deactivate: () => void;
    reload: () => Promise<void>;
    hydrateState: (thread: Thread) => void;
    registerSubscriptions: () => void;
    private subscribeThreadUpdated;
    private subscribeMarkActiveThreadRead;
    private subscribeReloadActiveStaleThread;
    private subscribeMarkThreadStale;
    private subscribeNewReplies;
    private subscribeRepliesRead;
    private subscribeMessageDeleted;
    private subscribeMessageUpdated;
    unregisterSubscriptions: () => symbol;
    deleteReplyLocally: ({ message }: {
        message: MessageResponse;
    }) => void;
    upsertReplyLocally: ({ message, timestampChanged, }: {
        message: MessageResponse | LocalMessage;
        timestampChanged?: boolean;
    }) => void;
    updateParentMessageLocally: ({ message }: {
        message: MessageResponse;
    }) => void;
    updateParentMessageOrReplyLocally: (message: MessageResponse) => void;
    markAsRead: ({ force }?: {
        force?: boolean;
    }) => Promise<import("./types").EventAPIResponse | null>;
    private throttledMarkAsRead;
    queryReplies: ({ limit, sort, ...otherOptions }?: QueryRepliesOptions) => Promise<import("./types").GetRepliesAPIResponse>;
    loadNextPage: ({ limit }?: {
        limit?: number;
    }) => Promise<void>;
    loadPrevPage: ({ limit }?: {
        limit?: number;
    }) => Promise<void>;
    private loadPage;
}
export {};
