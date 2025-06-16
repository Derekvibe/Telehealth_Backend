import { StateStore } from '../store';
import type { AddNotificationPayload, Notification, NotificationManagerConfig, NotificationState } from './types';
export declare class NotificationManager {
    store: StateStore<NotificationState>;
    private timeouts;
    config: NotificationManagerConfig;
    constructor(config?: Partial<NotificationManagerConfig>);
    get notifications(): Notification[];
    get warning(): Notification[];
    get error(): Notification[];
    get info(): Notification[];
    get success(): Notification[];
    add({ message, origin, options }: AddNotificationPayload): string;
    addError({ message, origin, options }: AddNotificationPayload): string;
    addWarning({ message, origin, options }: AddNotificationPayload): string;
    addInfo({ message, origin, options }: AddNotificationPayload): string;
    addSuccess({ message, origin, options }: AddNotificationPayload): string;
    remove(id: string): void;
    clear(): void;
}
