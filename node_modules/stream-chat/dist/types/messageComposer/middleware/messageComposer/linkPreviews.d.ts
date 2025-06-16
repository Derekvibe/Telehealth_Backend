import type { MessageComposer } from '../../messageComposer';
import type { MessageCompositionMiddleware, MessageDraftCompositionMiddleware } from './types';
export declare const createLinkPreviewsCompositionMiddleware: (composer: MessageComposer) => MessageCompositionMiddleware;
export declare const createDraftLinkPreviewsCompositionMiddleware: (composer: MessageComposer) => MessageDraftCompositionMiddleware;
