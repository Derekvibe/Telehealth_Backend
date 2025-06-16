import type { UserResponse } from './types';
import type { StreamChat } from './client';
/**
 * ClientState - A container class for the client state.
 */
export declare class ClientState {
    private client;
    users: {
        [key: string]: UserResponse;
    };
    userChannelReferences: {
        [key: string]: {
            [key: string]: boolean;
        };
    };
    constructor({ client }: {
        client: StreamChat;
    });
    updateUsers(users: UserResponse[]): void;
    updateUser(user?: UserResponse): void;
    updateUserReference(user: UserResponse, channelID: string): void;
    deleteAllChannelReference(channelID: string): void;
}
