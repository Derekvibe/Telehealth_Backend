import type { MessageCompositionMiddleware, MessageDraftCompositionMiddleware } from './types';
import type { MessageComposer } from '../../messageComposer';
export declare const createTextComposerCompositionMiddleware: (composer: MessageComposer) => MessageCompositionMiddleware;
export declare const createDraftTextComposerCompositionMiddleware: (composer: MessageComposer) => MessageDraftCompositionMiddleware;
