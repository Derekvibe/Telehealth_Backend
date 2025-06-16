import { StateStore } from './store';
import type { StreamChat } from './client';
import type { Thread } from './thread';
import type { QueryThreadsOptions } from './types';
import { WithSubscriptions } from './utils/WithSubscriptions';
export declare const THREAD_MANAGER_INITIAL_STATE: {
    active: boolean;
    isThreadOrderStale: boolean;
    threads: never[];
    unreadThreadCount: number;
    unseenThreadIds: never[];
    lastConnectionDropAt: null;
    pagination: {
        isLoading: boolean;
        isLoadingNext: boolean;
        nextCursor: null;
    };
    ready: boolean;
};
export type ThreadManagerState = {
    active: boolean;
    isThreadOrderStale: boolean;
    lastConnectionDropAt: Date | null;
    pagination: ThreadManagerPagination;
    ready: boolean;
    threads: Thread[];
    unreadThreadCount: number;
    /**
     * List of threads that haven't been loaded in the list, but have received new messages
     * since the latest reload. Useful to display a banner prompting to reload the thread list.
     */
    unseenThreadIds: string[];
};
export type ThreadManagerPagination = {
    isLoading: boolean;
    isLoadingNext: boolean;
    nextCursor: string | null;
};
export declare class ThreadManager extends WithSubscriptions {
    readonly state: StateStore<ThreadManagerState>;
    private client;
    private threadsByIdGetterCache;
    constructor({ client }: {
        client: StreamChat;
    });
    get threadsById(): Record<string, Thread | undefined>;
    resetState: () => void;
    activate: () => void;
    deactivate: () => void;
    registerSubscriptions: () => void;
    private subscribeUnreadThreadsCountChange;
    private subscribeChannelDeleted;
    private subscribeManageThreadSubscriptions;
    private subscribeReloadOnActivation;
    private subscribeNewReplies;
    private subscribeRecoverAfterConnectionDrop;
    unregisterSubscriptions: () => symbol;
    reload: ({ force }?: {
        force?: boolean | undefined;
    }) => Promise<void>;
    queryThreads: (options?: QueryThreadsOptions) => Promise<{
        threads: Thread[];
        next: string | undefined;
    }>;
    loadNextPage: (options?: Omit<QueryThreadsOptions, "next">) => Promise<void>;
}
