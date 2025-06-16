import { StateStore } from '..';
import type { CustomMessageComposerData, CustomMessageData, DraftMessage, LocalMessage } from '..';
import type { MessageComposer } from './messageComposer';
import type { DeepPartial } from '../types.utility';
export type CustomDataManagerState = {
    message: CustomMessageData;
    custom: CustomMessageComposerData;
};
export type CustomDataManagerOptions = {
    composer: MessageComposer;
    message?: DraftMessage | LocalMessage;
};
export declare class CustomDataManager {
    composer: MessageComposer;
    state: StateStore<CustomDataManagerState>;
    constructor({ composer, message }: CustomDataManagerOptions);
    get customMessageData(): CustomMessageData;
    get customComposerData(): CustomMessageComposerData;
    isMessageDataEqual: (nextState: CustomDataManagerState, previousState?: CustomDataManagerState) => boolean;
    initState: ({ message }?: {
        message?: DraftMessage | LocalMessage;
    }) => void;
    setMessageData(data: DeepPartial<CustomMessageData>): void;
    setCustomData(data: DeepPartial<CustomMessageComposerData>): void;
}
