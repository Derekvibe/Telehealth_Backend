import { MiddlewareExecutor } from '../../../middleware';
import type { PollComposerCompositionMiddlewareValueState, PollComposerStateChangeMiddlewareValue } from './types';
import type { MessageComposer } from '../../messageComposer';
export type PollComposerMiddlewareExecutorOptions = {
    composer: MessageComposer;
};
export declare class PollComposerCompositionMiddlewareExecutor extends MiddlewareExecutor<PollComposerCompositionMiddlewareValueState, 'compose'> {
    constructor({ composer }: PollComposerMiddlewareExecutorOptions);
}
export declare class PollComposerStateMiddlewareExecutor extends MiddlewareExecutor<PollComposerStateChangeMiddlewareValue, 'handleFieldChange' | 'handleFieldBlur'> {
    constructor();
}
