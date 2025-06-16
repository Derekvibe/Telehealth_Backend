import type { MessageCompositionMiddleware } from './types';
import type { MessageComposer } from '../../messageComposer';
export declare const createPollOnlyCompositionMiddleware: (composer: MessageComposer) => MessageCompositionMiddleware;
