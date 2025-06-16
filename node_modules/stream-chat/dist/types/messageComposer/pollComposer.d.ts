import { PollComposerCompositionMiddlewareExecutor, PollComposerStateMiddlewareExecutor } from './middleware/pollComposer';
import { StateStore } from '../store';
import { VotingVisibility } from '../types';
import type { MessageComposer } from './messageComposer';
import type { PollComposerFieldErrors, PollComposerState, UpdateFieldsData } from './middleware/pollComposer';
export type PollComposerOptions = {
    composer: MessageComposer;
};
export declare class PollComposer {
    readonly state: StateStore<PollComposerState>;
    readonly composer: MessageComposer;
    readonly compositionMiddlewareExecutor: PollComposerCompositionMiddlewareExecutor;
    readonly stateMiddlewareExecutor: PollComposerStateMiddlewareExecutor;
    constructor({ composer }: PollComposerOptions);
    get initialState(): PollComposerState;
    get allow_answers(): boolean | undefined;
    get allow_user_suggested_options(): boolean | undefined;
    get description(): string | undefined;
    get enforce_unique_vote(): boolean | undefined;
    get id(): string;
    get max_votes_allowed(): string;
    get name(): string;
    get options(): import("..").PollComposerOption[];
    get user_id(): string | undefined;
    get voting_visibility(): VotingVisibility | undefined;
    get canCreatePoll(): boolean;
    initState: () => void;
    /**
     * Updates specified fields and generates relevant errors
     * @param data
     * @param injectedFieldErrors - errors produced externally that will take precedence over the errors generated in the middleware chaing
     */
    updateFields: (data: UpdateFieldsData, injectedFieldErrors?: PollComposerFieldErrors) => Promise<void>;
    handleFieldBlur: (field: keyof PollComposerState["data"]) => Promise<void>;
    compose: () => Promise<import("..").PollComposerCompositionMiddlewareValueState | undefined>;
}
