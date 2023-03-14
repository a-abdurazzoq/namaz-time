import {UseCase} from "../../index";
import {PostForTelegram} from "../../../../domain/entities";

export interface SendPrayerTimesToTelegramChatUseCase extends UseCase<SendPrayerTimesToTelegramChat.Params, SendPrayerTimesToTelegramChat.Response> {}

export namespace SendPrayerTimesToTelegramChat {
    export interface Params {
        postForTelegram: PostForTelegram;
        necessaryDate: Date
    }

    export type Response = Error | Success

    export interface Error extends Result {
        success: false;
        error: any;
    }

    export interface Success extends Result {
        success: true;
    }

    export interface Result {
        id: string;
        name: string;
        success: boolean;
    }
}