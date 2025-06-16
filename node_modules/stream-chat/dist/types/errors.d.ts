import type { AxiosResponse } from 'axios';
import type { APIErrorResponse } from './types';
export declare const APIErrorCodes: Record<string, {
    name: string;
    retryable: boolean;
}>;
export type APIError = Error & {
    code: number;
    isWSFailure?: boolean;
    StatusCode?: number;
};
export declare function isAPIError(error: Error): error is APIError;
export declare function isErrorRetryable(error: APIError): boolean;
export declare function isConnectionIDError(error: APIError): boolean;
export declare function isWSFailure(err: APIError): boolean;
export declare function isErrorResponse(res: AxiosResponse<unknown>): res is AxiosResponse<APIErrorResponse>;
