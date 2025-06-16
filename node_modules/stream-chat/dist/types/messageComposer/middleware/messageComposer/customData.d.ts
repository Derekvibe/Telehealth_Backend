import type { MessageComposer } from '../../messageComposer';
import type { MessageCompositionMiddleware, MessageDraftCompositionMiddleware } from './types';
export declare const createCustomDataCompositionMiddleware: (composer: MessageComposer) => MessageCompositionMiddleware;
export declare const createDraftCustomDataCompositionMiddleware: (composer: MessageComposer) => MessageDraftCompositionMiddleware;
