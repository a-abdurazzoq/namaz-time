export interface TelegramBotClient {
    getChatAdministrators(params: GetChatAdministrators.Params): Promise<GetChatAdministrators.Response>
    getChat(params: GetChat.Params): Promise<GetChat.Response>
    sendPhoto(params: SendPhoto.Params): Promise<SendPhoto.Response>;
    sendMessage(params: SendMessage.Params): Promise<SendMessage.Response>;
    hasPermission(params: HasPermission.Params): Promise<HasPermission.Response>;
}

interface BasicParams {
    chat_id: number;
}

type BasicResponse<Result = any> = FailedResult | SuccessResult<Result>

interface FailedResult {
    ok: false;
    error_code: number;
    description: string;
}

interface SuccessResult<Result = any> {
    ok: true;
    result: Result;
}



export namespace SendPhoto {
    export interface Params extends BasicParams {
        photo: Buffer;
        caption?: string;
    }

    export type Response = BasicResponse
}



export namespace SendMessage {
    export interface Params extends BasicParams {
        text: string;
        parse_mode?: string
    }

    export type Response = BasicResponse
}



export namespace HasPermission {
    export interface Params extends BasicParams {}

    export type Response = boolean
}



export namespace GetChatAdministrators {
    export interface Params extends BasicParams {}

    export type Response = BasicResponse<Array<User | Bot>>

    export enum StatusUserEnum {
        CREATOR = "creator",
        ADMINISTRATOR = "administrator",
    }

    export interface User {
        user: {
            id: number;
            is_bot: false;
            first_name: string;
            username?: string;
        };
        status: StatusUserEnum;
        is_anonymous: boolean;
    }


    export interface Bot {
        user: {
            id: number;
            is_bot: true;
            first_name: string;
            username: string;
        };
        status: StatusUserEnum;
        is_anonymous: boolean;
        can_be_edited: boolean;
        can_manage_chat: boolean;
        can_change_info: boolean;
        can_post_messages: boolean;
        can_edit_messages: boolean;
        can_delete_messages: boolean;
        can_invite_users: boolean;
        can_restrict_members: boolean;
        can_promote_members: boolean;
        can_manage_video_chats: boolean;
        can_manage_voice_chats: boolean;
    }
}



export namespace GetChat {
    export interface Params extends BasicParams {}

    export type Response = BasicResponse<{
        id: number;
        title: string;
        username?: string;
        type: ChatTypes;
    }>

    export enum ChatTypes {
        PRIVATE = "private",
        GROUP = "group",
        SUPERGROUP = "supergroup",
        CHANNEL = "channel",

    }
}