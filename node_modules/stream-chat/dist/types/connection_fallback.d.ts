import type { AxiosRequestConfig, CancelTokenSource } from 'axios';
import type { StreamChat } from './client';
import type { ConnectionOpen, LogLevel, UR } from './types';
export declare enum ConnectionState {
    Closed = "CLOSED",
    Connected = "CONNECTED",
    Connecting = "CONNECTING",
    Disconnected = "DISCONNECTED",
    Init = "INIT"
}
export declare class WSConnectionFallback {
    client: StreamChat;
    state: ConnectionState;
    consecutiveFailures: number;
    connectionID?: string;
    cancelToken?: CancelTokenSource;
    constructor({ client }: {
        client: StreamChat;
    });
    _log(msg: string, extra?: UR, level?: LogLevel): void;
    _setState(state: ConnectionState): void;
    /** @private */
    _onlineStatusChanged: (event: {
        type: string;
    }) => void;
    /** @private */
    _req: <T = UR>(params: UR, config: AxiosRequestConfig, retry: boolean) => Promise<T>;
    /** @private */
    _poll: () => Promise<void>;
    /**
     * connect try to open a longpoll request
     * @param reconnect should be false for first call and true for subsequent calls to keep the connection alive and call recoverState
     */
    connect: (reconnect?: boolean) => Promise<ConnectionOpen | undefined>;
    /**
     * isHealthy checks if there is a connectionID and connection is in Connected state
     */
    isHealthy: () => boolean;
    disconnect: (timeout?: number) => Promise<void>;
}
