import {UseCase} from "../../index";
import {PostForTelegram} from "../../../../domain/entities";

export interface MassSendPrayerTimesToTelegramChatsUseCase extends UseCase<MassSendPrayerTimesToTelegramChats.Params, MassSendPrayerTimesToTelegramChats.Response> {}

export namespace MassSendPrayerTimesToTelegramChats {
    export type Params = PostForTelegram[]

    export interface Response {
        success: Results<Chat>;
        failed: Results<ChatWithError>;
    }

    export interface Chat {
        id: string;
        name: string;
    }

    export interface ChatWithError extends Chat {
        error: any;
    }

    export interface Results<Chat> {
        count: number;
        chats: Chat[];
    }
}
