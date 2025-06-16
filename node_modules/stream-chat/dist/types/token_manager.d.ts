import type jwt from 'jsonwebtoken';
import type { TokenOrProvider, UserResponse } from './types';
/**
 * TokenManager
 *
 * Handles all the operations around user token.
 */
export declare class TokenManager {
    loadTokenPromise: Promise<string> | null;
    type: 'static' | 'provider';
    secret?: jwt.Secret;
    token?: string;
    tokenProvider?: TokenOrProvider;
    user?: UserResponse;
    /**
     * Constructor
     *
     * @param {Secret} secret
     */
    constructor(secret?: jwt.Secret);
    /**
     * Set the static string token or token provider.
     * Token provider should return a token string or a promise which resolves to string token.
     *
     * @param {TokenOrProvider} tokenOrProvider
     * @param {UserResponse} user
     */
    setTokenOrProvider: (tokenOrProvider: TokenOrProvider, user: UserResponse) => Promise<void>;
    /**
     * Resets the token manager.
     * Useful for client disconnection or switching user.
     */
    reset: () => void;
    validateToken: (tokenOrProvider: TokenOrProvider, user: UserResponse) => void;
    tokenReady: () => Promise<string> | null;
    loadToken: () => Promise<string>;
    getToken: () => string | undefined;
    isStatic: () => boolean;
}
