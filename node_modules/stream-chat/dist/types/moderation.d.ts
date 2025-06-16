import type { APIResponse, CustomCheckFlag, GetConfigResponse, GetUserModerationReportOptions, GetUserModerationReportResponse, ModerationConfig, ModerationFlagOptions, ModerationMuteOptions, Pager, QueryConfigsResponse, QueryModerationConfigsFilters, QueryModerationConfigsSort, RequireAtLeastOne, ReviewQueueFilters, ReviewQueueItem, ReviewQueuePaginationOptions, ReviewQueueResponse, ReviewQueueSort, SubmitActionOptions, UpsertConfigResponse } from './types';
import type { StreamChat } from './client';
export declare const MODERATION_ENTITY_TYPES: {
    user: string;
    message: string;
    userprofile: string;
};
export declare class Moderation {
    client: StreamChat;
    constructor(client: StreamChat);
    /**
     * Flag a user
     *
     * @param {string} flaggedUserID User ID to be flagged
     * @param {string} reason Reason for flagging the user
     * @param {Object} options Additional options for flagging the user
     * @param {string} options.user_id (For server side usage) User ID of the user who is flagging the target user
     * @param {Object} options.custom Additional data to be stored with the flag
     * @returns
     */
    flagUser(flaggedUserID: string, reason: string, options?: ModerationFlagOptions): Promise<{
        item_id: string;
    } & APIResponse>;
    /**
     * Flag a message
     *
     * @param {string} messageID Message ID to be flagged
     * @param {string} reason Reason for flagging the message
     * @param {Object} options Additional options for flagging the message
     * @param {string} options.user_id (For server side usage) User ID of the user who is flagging the target message
     * @param {Object} options.custom Additional data to be stored with the flag
     * @returns
     */
    flagMessage(messageID: string, reason: string, options?: ModerationFlagOptions): Promise<{
        item_id: string;
    } & APIResponse>;
    /**
     * Flag a user
     *
     * @param {string} entityType Entity type to be flagged
     * @param {string} entityId Entity ID to be flagged
     * @param {string} entityCreatorID User ID of the entity creator
     * @param {string} reason Reason for flagging the entity
     * @param {Object} options Additional options for flagging the entity
     * @param {string} options.user_id (For server side usage) User ID of the user who is flagging the target entity
     * @param {Object} options.moderation_payload Content to be flagged e.g., { texts: ['text1', 'text2'], images: ['image1', 'image2']}
     * @param {Object} options.custom Additional data to be stored with the flag
     * @returns
     */
    flag(entityType: string, entityId: string, entityCreatorID: string, reason: string, options?: ModerationFlagOptions): Promise<{
        item_id: string;
    } & APIResponse>;
    /**
     * Mute a user
     * @param {string} targetID  User ID to be muted
     * @param {Object} options Additional options for muting the user
     * @param {string} options.user_id (For server side usage) User ID of the user who is muting the target user
     * @param {number} options.timeout Timeout for the mute in minutes
     * @returns
     */
    muteUser(targetID: string, options?: ModerationMuteOptions): Promise<APIResponse & {
        mute?: import("./types").MuteResponse;
        mutes?: Array<import("./types").Mute>;
        own_user?: import("./types").OwnUserResponse;
    }>;
    /**
     * Unmute a user
     * @param {string} targetID  User ID to be unmuted
     * @param {Object} options Additional options for unmuting the user
     * @param {string} options.user_id (For server side usage) User ID of the user who is unmuting the target user
     * @returns
     */
    unmuteUser(targetID: string, options: {
        user_id?: string;
    }): Promise<{
        item_id: string;
    } & APIResponse>;
    /**
     * Get moderation report for a user
     * @param {string} userID User ID for which moderation report is to be fetched
     * @param {Object} options Additional options for fetching the moderation report
     * @param {boolean} options.create_user_if_not_exists Create user if not exists
     * @param {boolean} options.include_user_blocks Include user blocks
     * @param {boolean} options.include_user_mutes Include user mutes
     */
    getUserModerationReport(userID: string, options?: GetUserModerationReportOptions): Promise<GetUserModerationReportResponse>;
    /**
     * Query review queue
     * @param {Object} filterConditions Filter conditions for querying review queue
     * @param {Object} sort Sort conditions for querying review queue
     * @param {Object} options Pagination options for querying review queue
     */
    queryReviewQueue(filterConditions?: ReviewQueueFilters, sort?: ReviewQueueSort, options?: ReviewQueuePaginationOptions): Promise<ReviewQueueResponse>;
    /**
     * Upsert moderation config
     * @param {Object} config Moderation config to be upserted
     */
    upsertConfig(config: ModerationConfig): Promise<UpsertConfigResponse>;
    /**
     * Get moderation config
     * @param {string} key Key for which moderation config is to be fetched
     */
    getConfig(key: string, data?: {
        team?: string;
    }): Promise<GetConfigResponse>;
    deleteConfig(key: string, data?: {
        team?: string;
    }): Promise<unknown>;
    /**
     * Query moderation configs
     * @param {Object} filterConditions Filter conditions for querying moderation configs
     * @param {Object} sort Sort conditions for querying moderation configs
     * @param {Object} options Additional options for querying moderation configs
     */
    queryConfigs(filterConditions: QueryModerationConfigsFilters, sort: QueryModerationConfigsSort, options?: Pager): Promise<QueryConfigsResponse>;
    submitAction(actionType: string, itemID: string, options?: SubmitActionOptions): Promise<{
        item_id: string;
    } & APIResponse>;
    /**
     *
     * @param {string} entityType string Type of entity to be checked E.g., stream:user, stream:chat:v1:message, or any custom string
     * @param {string} entityID string ID of the entity to be checked. This is mainly for tracking purposes
     * @param {string} entityCreatorID string ID of the entity creator
     * @param {object} moderationPayload object Content to be checked for moderation. E.g., { texts: ['text1', 'text2'], images: ['image1', 'image2']}
     * @param {Array} moderationPayload.texts array Array of texts to be checked for moderation
     * @param {Array} moderationPayload.images array Array of images to be checked for moderation
     * @param {Array} moderationPayload.videos array Array of videos to be checked for moderation
     * @param configKey
     * @param options
     * @returns
     */
    check(entityType: string, entityID: string, entityCreatorID: string, moderationPayload: {
        custom?: Record<string, any>;
        images?: string[];
        texts?: string[];
        videos?: string[];
    }, configKey: string, options?: {
        force_sync?: boolean;
        test_mode?: boolean;
    }): Promise<unknown>;
    /**
     * Experimental: Check user profile
     *
     * Warning: This is an experimental feature and the API is subject to change.
     *
     * This function is used to check a user profile for moderation.
     * This will not create any review queue items for the user profile.
     * You can just use this to check whether to allow a certain user profile to be created or not.
     *
     * Example:
     *
     * ```ts
     * const res = await client.moderation.checkUserProfile(userId, { username: "fuck_boy_001", image: "https://example.com/profile.jpg" });
     * if (res.recommended_action === "remove") {
     *   // Block the user profile from being created
     * } else {
     *   // Allow the user profile to be created
     * }
     * ```
     *
     * @param userId
     * @param profile.username
     * @param profile.image
     * @returns
     */
    checkUserProfile(userId: string, profile: RequireAtLeastOne<{
        image?: string;
        username?: string;
    }>): Promise<unknown>;
    /**
     *
     * @param {string} entityType string Type of entity to be checked E.g., stream:user, stream:chat:v1:message, or any custom string
     * @param {string} entityID string ID of the entity to be checked. This is mainly for tracking purposes
     * @param {string} entityCreatorID string ID of the entity creator
     * @param {object} moderationPayload object Content to be checked for moderation. E.g., { texts: ['text1', 'text2'], images: ['image1', 'image2']}
     * @param {Array} moderationPayload.texts array Array of texts to be checked for moderation
     * @param {Array} moderationPayload.images array Array of images to be checked for moderation
     * @param {Array} moderationPayload.videos array Array of videos to be checked for moderation
     * @param {Array<CustomCheckFlag>} flags Array of CustomCheckFlag to be passed to flag the entity
     * @returns
     */
    addCustomFlags(entityType: string, entityID: string, entityCreatorID: string, moderationPayload: {
        images?: string[];
        texts?: string[];
        videos?: string[];
    }, flags: CustomCheckFlag[]): Promise<{
        id: string;
        item: ReviewQueueItem;
        status: string;
    } & APIResponse>;
    /**
     * Add custom flags to a message
     * @param {string} messageID Message ID to be flagged
     * @param {Array<CustomCheckFlag>} flags Array of CustomCheckFlag to be passed to flag the message
     * @returns
     */
    addCustomMessageFlags(messageID: string, flags: CustomCheckFlag[]): Promise<{
        id: string;
        item: ReviewQueueItem;
        status: string;
    } & APIResponse>;
}
