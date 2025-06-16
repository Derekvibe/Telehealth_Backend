import type { MessageComposer } from '../../messageComposer';
import type { MessageCompositionMiddleware, MessageDraftCompositionMiddleware } from './types';
export declare const createAttachmentsCompositionMiddleware: (composer: MessageComposer) => MessageCompositionMiddleware;
export declare const createDraftAttachmentsCompositionMiddleware: (composer: MessageComposer) => MessageDraftCompositionMiddleware;
