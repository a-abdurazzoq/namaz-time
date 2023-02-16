import {UseCase} from "../../index";
import {ChatForSendingPrayerTimes} from "../../../../domain/entities";

export interface SendPrayerTimesToTelegramChannelUseCase extends UseCase<SendPrayerTimesToTelegramChannel.Params, SendPrayerTimesToTelegramChannel.Response> {}

export namespace SendPrayerTimesToTelegramChannel {
    export interface Params {
        chatForSendingPrayerTimes: ChatForSendingPrayerTimes;
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