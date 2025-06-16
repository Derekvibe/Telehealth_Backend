import { MiddlewareExecutor } from '../../../middleware';
import type { MessageComposerMiddlewareExecutorOptions, MessageComposerMiddlewareState, MessageDraftComposerMiddlewareExecutorOptions, MessageDraftComposerMiddlewareValueState } from './types';
export declare class MessageComposerMiddlewareExecutor extends MiddlewareExecutor<MessageComposerMiddlewareState, 'compose'> {
    constructor({ composer }: MessageComposerMiddlewareExecutorOptions);
}
export declare class MessageDraftComposerMiddlewareExecutor extends MiddlewareExecutor<MessageDraftComposerMiddlewareValueState, 'compose'> {
    constructor({ composer }: MessageDraftComposerMiddlewareExecutorOptions);
}
