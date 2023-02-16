import {UseCase} from "../../index";
import {ChatForSendingPrayerTimes} from "../../../../domain/entities";

export interface MassSendPrayerTimesToTelegramChannelsUseCase extends UseCase<MassSendPrayerTimesToTelegramChannels.Params, MassSendPrayerTimesToTelegramChannels.Response> {}

export namespace MassSendPrayerTimesToTelegramChannels {
    export type Params = ChatForSendingPrayerTimes[]

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
