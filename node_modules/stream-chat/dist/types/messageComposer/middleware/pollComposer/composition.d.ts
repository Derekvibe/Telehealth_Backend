import type { Middleware } from '../../../middleware';
import type { MessageComposer } from '../../messageComposer';
import type { PollComposerCompositionMiddlewareValueState } from './types';
export type PollCompositionValidationMiddleware = Middleware<PollComposerCompositionMiddlewareValueState, 'compose'>;
export declare const createPollCompositionValidationMiddleware: (composer: MessageComposer) => PollCompositionValidationMiddleware;
