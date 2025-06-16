import type { Middleware } from '../../../middleware';
import type { PollComposerFieldErrors, PollComposerState, PollComposerStateChangeMiddlewareValue, TargetedPollOptionTextUpdate } from './types';
export declare const VALID_MAX_VOTES_VALUE_REGEX: RegExp;
export declare const MAX_POLL_OPTIONS: 100;
export type PollStateValidationOutput = Partial<Omit<Record<keyof PollComposerState['data'], string>, 'options'> & {
    options?: Record<string, string>;
}>;
export type PollStateChangeValidator = (params: {
    data: PollComposerState['data'];
    value: any;
    currentError?: PollComposerFieldErrors[keyof PollComposerFieldErrors];
}) => PollStateValidationOutput;
export declare const pollStateChangeValidators: Partial<Record<keyof PollComposerState['data'], PollStateChangeValidator>>;
export declare const defaultPollFieldChangeEventValidators: Partial<Record<keyof PollComposerState['data'], PollStateChangeValidator>>;
export declare const defaultPollFieldBlurEventValidators: Partial<Record<keyof PollComposerState['data'], PollStateChangeValidator>>;
export type PollCompositionStateProcessorOutput = Partial<PollComposerState['data']>;
export type PollCompositionStateProcessor = (params: {
    data: PollComposerState['data'];
    value: any;
}) => PollCompositionStateProcessorOutput;
export declare const isTargetedOptionTextUpdate: (value: unknown) => value is TargetedPollOptionTextUpdate;
export declare const pollCompositionStateProcessors: Partial<Record<keyof PollComposerState['data'], PollCompositionStateProcessor>>;
export type PollComposerStateMiddlewareFactoryOptions = {
    processors?: {
        handleFieldChange?: Partial<Record<keyof PollComposerState['data'], PollCompositionStateProcessor>>;
        handleFieldBlur?: Partial<Record<keyof PollComposerState['data'], PollCompositionStateProcessor>>;
    };
    validators?: {
        handleFieldChange?: Partial<Record<keyof PollComposerState['data'], PollStateChangeValidator>>;
        handleFieldBlur?: Partial<Record<keyof PollComposerState['data'], PollStateChangeValidator>>;
    };
};
export type PollComposerStateMiddleware = Middleware<PollComposerStateChangeMiddlewareValue, 'handleFieldChange' | 'handleFieldBlur'>;
export declare const createPollComposerStateMiddleware: ({ processors: customProcessors, validators: customValidators, }?: PollComposerStateMiddlewareFactoryOptions) => PollComposerStateMiddleware;
