import { MiddlewareExecutor } from '../../../middleware';
import type { ExecuteParams, MiddlewareExecutionResult, MiddlewareHandler } from '../../../middleware';
import type { Suggestion, TextComposerMiddlewareExecutorOptions, TextComposerState } from './types';
export type TextComposerMiddlewareExecutorState<T extends Suggestion = Suggestion> = TextComposerState<T> & {
    change?: {
        selectedSuggestion?: T;
    };
};
export type TextComposerHandlerNames = 'onChange' | 'onSuggestionItemSelect';
export type TextComposerMiddleware<T extends Suggestion = Suggestion> = {
    id: string;
    handlers: {
        [K in TextComposerHandlerNames]: MiddlewareHandler<TextComposerMiddlewareExecutorState<T>>;
    };
};
export declare class TextComposerMiddlewareExecutor<T extends Suggestion = Suggestion> extends MiddlewareExecutor<TextComposerMiddlewareExecutorState<T>, TextComposerHandlerNames> {
    constructor({ composer }: TextComposerMiddlewareExecutorOptions);
    execute({ eventName, initialValue: initialState, }: ExecuteParams<TextComposerMiddlewareExecutorState<T>>): Promise<MiddlewareExecutionResult<TextComposerMiddlewareExecutorState<T>>>;
}
