import { ReminderTimer } from './ReminderTimer';
import { StateStore } from '../store';
import type { ReminderTimerConfig } from './ReminderTimer';
import type { MessageResponse, ReminderResponseBase, UserResponse } from '../types';
export declare const timeLeftMs: (remindAt: number) => number;
export type ReminderResponseBaseOrResponse = ReminderResponseBase & {
    user?: UserResponse;
    message?: MessageResponse;
};
export type ReminderState = {
    channel_cid: string;
    created_at: Date;
    message: MessageResponse | null;
    message_id: string;
    remind_at: Date | null;
    timeLeftMs: number | null;
    updated_at: Date;
    user: UserResponse | null;
    user_id: string;
};
export type ReminderOptions = {
    data: ReminderResponseBaseOrResponse;
    config?: ReminderTimerConfig;
};
export declare class Reminder {
    state: StateStore<ReminderState>;
    timer: ReminderTimer;
    constructor({ data, config }: ReminderOptions);
    static toStateValue: (data: ReminderResponseBaseOrResponse) => ReminderState;
    get id(): string;
    get remindAt(): Date | null;
    get timeLeftMs(): number | null;
    setState: (data: ReminderResponseBaseOrResponse) => void;
    refreshTimeLeft: () => void;
    initTimer: () => void;
    clearTimer: () => void;
}
