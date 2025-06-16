import type { MessageCompositionMiddleware, MessageDraftCompositionMiddleware } from './types';
import type { MessageComposer } from '../../messageComposer';
export declare const createCompositionValidationMiddleware: (composer: MessageComposer) => MessageCompositionMiddleware;
export declare const createDraftCompositionValidationMiddleware: (composer: MessageComposer) => MessageDraftCompositionMiddleware;
