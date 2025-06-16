import type { MessageComposer } from '../../messageComposer';
import type { TextComposerMiddlewareExecutorState } from './TextComposerMiddlewareExecutor';
import type { Suggestion } from './types';
import type { Middleware } from '../../../middleware';
export type TextComposerPreValidationMiddleware = Middleware<TextComposerMiddlewareExecutorState<Suggestion>, 'onChange' | 'onSuggestionItemSelect'>;
export declare const createTextComposerPreValidationMiddleware: (composer: MessageComposer) => TextComposerPreValidationMiddleware;
