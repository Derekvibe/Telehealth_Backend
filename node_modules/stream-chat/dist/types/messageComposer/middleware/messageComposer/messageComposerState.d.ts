import type { MessageCompositionMiddleware, MessageDraftCompositionMiddleware } from './types';
import type { MessageComposer } from '../../messageComposer';
export declare const createMessageComposerStateCompositionMiddleware: (composer: MessageComposer) => MessageCompositionMiddleware;
export declare const createDraftMessageComposerStateCompositionMiddleware: (composer: MessageComposer) => MessageDraftCompositionMiddleware;
