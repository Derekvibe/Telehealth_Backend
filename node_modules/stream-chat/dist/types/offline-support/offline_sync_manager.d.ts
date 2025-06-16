import type { StreamChat } from '../client';
import type { AbstractOfflineDB } from './offline_support_api';
/**
 * Manages synchronization between the local offline database and the Stream backend.
 *
 * Responsible for detecting connection changes, syncing channel data, and executing
 * pending tasks queued during offline periods. This class ensures the database remains
 * consistent with the server once connectivity is restored.
 */
export declare class OfflineDBSyncManager {
    syncStatus: boolean;
    connectionChangedListener: {
        unsubscribe: () => void;
    } | null;
    private syncStatusListeners;
    private scheduledSyncStatusCallbacks;
    private client;
    private offlineDb;
    constructor({ client, offlineDb, }: {
        client: StreamChat;
        offlineDb: AbstractOfflineDB;
    });
    /**
     * Initializes the sync manager. Should only be called once per session.
     *
     * Cleans up old listeners if re-initialized to avoid memory leaks.
     * Starts syncing immediately if already connected, otherwise waits for reconnection.
     */
    init: () => Promise<void>;
    /**
     * Registers a listener that is called whenever the sync status changes.
     *
     * @param listener - A callback invoked with the new sync status (`true` or `false`).
     * @returns An object with an `unsubscribe` function to remove the listener.
     */
    onSyncStatusChange: (listener: (status: boolean) => void) => {
        unsubscribe: () => void;
    };
    /**
     * Schedules a one-time callback to be invoked after the next successful sync.
     *
     * @param tag - A unique key to identify and manage the callback.
     * @param callback - An async function to run after sync.
     */
    scheduleSyncStatusChangeCallback: (tag: string | symbol, callback: () => Promise<void>) => void;
    /**
     * Invokes all registered sync status listeners and executes any scheduled sync callbacks.
     *
     * @param status - The new sync status (`true` or `false`).
     */
    private invokeSyncStatusListeners;
    /**
     * Performs synchronization with the Stream backend.
     *
     * This includes downloading events since the last sync, updating the local DB,
     * and handling sync failures (e.g., if syncing beyond the allowed retention window).
     */
    private sync;
    /**
     * Executes any tasks that were queued while offline and then performs a sync.
     */
    private syncAndExecutePendingTasks;
}
