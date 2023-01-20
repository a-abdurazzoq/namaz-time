import {ChatForSendingPrayerTimesRepository} from "./abstractions";
import {ChatForSendingPrayerTimes} from "../domain/entities";
import {inject, injectable} from "inversify";
import {ChatForSendingPrayerTimesFactory} from "../domain/abstractions/factories";
import {Symbols} from "../dependencies/symbols";
import {ChatForSendingPrayerTimesModel, IChatForSendingPrayerTimesModel} from "../models";

@injectable()
export class ChatForSendingPrayerTimesRepositoryImpl implements ChatForSendingPrayerTimesRepository {
    constructor(
        @inject<ChatForSendingPrayerTimesFactory>(Symbols.Factories.ChatForSendingPrayerTimes) private chatForSendingPrayerTimesFactory: ChatForSendingPrayerTimesFactory
    ) {}

    public async getById(id: string): Promise<ChatForSendingPrayerTimes> {
        let getChatForSendingPrayerTimes = await ChatForSendingPrayerTimesModel.findById<IChatForSendingPrayerTimesModel>(id)

        if(!getChatForSendingPrayerTimes)
            throw new Error("Chat for sending prayer times not found by id")

        return this.toEntity(getChatForSendingPrayerTimes)
    }

    private toEntity(chatsForSendingPrayerTimesModel: IChatForSendingPrayerTimesModel): ChatForSendingPrayerTimes {
        return this.chatForSendingPrayerTimesFactory.create({
            id: chatsForSendingPrayerTimesModel._id.toHexString(),
            telegramChannelId: chatsForSendingPrayerTimesModel.telegram_channel_id.toHexString(),
            chatId: chatsForSendingPrayerTimesModel.chat_id,
            timePerDay: chatsForSendingPrayerTimesModel.time_per_day,
            nextTime: chatsForSendingPrayerTimesModel.next_time,
            createAt: chatsForSendingPrayerTimesModel.create_at,
            updateAt: chatsForSendingPrayerTimesModel.update_at
        })
    }
}