import type { Reminder } from './Reminder';
export declare const DEFAULT_STOP_REFRESH_BOUNDARY_MS: number;
export type ReminderTimerConfig = {
    stopRefreshBoundaryMs?: number;
};
export declare class ReminderTimer {
    reminder: Reminder;
    timeout: ReturnType<typeof setTimeout> | null;
    stopRefreshBoundaryMs: number;
    constructor({ reminder, config, }: {
        reminder: Reminder;
        config?: ReminderTimerConfig;
    });
    getRefreshIntervalLength: () => number | null;
    init: () => null | undefined;
    clear: () => void;
}
