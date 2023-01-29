import {UseCase} from "../index";
import {ChatForSendingPrayerTimes} from "../../../domain/entities";

export interface GetAllExecuteTimeChatsForSendingUseCase extends UseCase<GetAllExecuteTimeChatsForSending.Params, GetAllExecuteTimeChatsForSending.Response> {}

export namespace GetAllExecuteTimeChatsForSending {
    export interface Params {
        date: Date
    }

    export type Response = ChatForSendingPrayerTimes[];
}