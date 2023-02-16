import {ChatForSendingPrayerTimesRepository, TelegramChannelRepository, TemplatePhotoRepository} from "./abstractions";
import {ChatForSendingPrayerTimes} from "../domain/entities";
import {inject, injectable} from "inversify";
import {ChatForSendingPrayerTimesFactory} from "../domain/abstractions/factories";
import {Symbols} from "../dependencies/symbols";
import {ChatForSendingPrayerTimesModel, IChatForSendingPrayerTimesModel} from "../models";

@injectable()
export class ChatForSendingPrayerTimesRepositoryImpl implements ChatForSendingPrayerTimesRepository {
    constructor(
        @inject(Symbols.Factories.ChatForSendingPrayerTimes) private chatForSendingPrayerTimesFactory: ChatForSendingPrayerTimesFactory,
        @inject(Symbols.Repositories.TelegramChannel) private telegramChannelRepository: TelegramChannelRepository,
        @inject(Symbols.Repositories.TemplatePhoto) private templatePhotoRepository: TemplatePhotoRepository
    ) {}

    public async getAllLessAndEqualByNextTime(date: Date): Promise<ChatForSendingPrayerTimes[]> {
        let getChatsForSendingPrayerTimes = await ChatForSendingPrayerTimesModel.find<IChatForSendingPrayerTimesModel>({next_time: {$lte: date}})

        return this.toEntities(getChatsForSendingPrayerTimes)
    }

    public async getById(id: string): Promise<ChatForSendingPrayerTimes> {
        let getChatForSendingPrayerTimes = await ChatForSendingPrayerTimesModel.findById<IChatForSendingPrayerTimesModel>(id)

        if(!getChatForSendingPrayerTimes)
            throw new Error("Chat for sending prayers in day times not found by id")

        return this.toEntity(getChatForSendingPrayerTimes)
    }

    public async updateNextTime(chatForSendingPrayerTimes: ChatForSendingPrayerTimes): Promise<ChatForSendingPrayerTimes> {
        let getChatForSendingPrayerTimes = await ChatForSendingPrayerTimesModel.findByIdAndUpdate(chatForSendingPrayerTimes.getId(), {
            $set: {
                next_time: chatForSendingPrayerTimes.updateNextTime().getTime(),
                update_at: Date.now()
            }
        })

        if(!getChatForSendingPrayerTimes)
            throw new Error("An error occurred while trying to update the next \"Chat for sending prayer times\" date")

        return this.toEntity(getChatForSendingPrayerTimes)
    }

    private toEntities(chatsForSendingPrayerTimesModel: IChatForSendingPrayerTimesModel[]): Promise<ChatForSendingPrayerTimes[]> {
        let entities = chatsForSendingPrayerTimesModel.map(chatForSendingPrayerTimesModel => this.toEntity(chatForSendingPrayerTimesModel))

        return Promise.all(entities)
    }

    private async toEntity(chatsForSendingPrayerTimesModel: IChatForSendingPrayerTimesModel): Promise<ChatForSendingPrayerTimes> {
        let telegramChannel = await this.telegramChannelRepository.getById(chatsForSendingPrayerTimesModel.telegram_channel_id.toHexString())
        let templatePhoto = await this.templatePhotoRepository.getById(chatsForSendingPrayerTimesModel.template_photo_id.toHexString())

        return this.chatForSendingPrayerTimesFactory.create({
            id: chatsForSendingPrayerTimesModel._id.toHexString(),
            telegramChannel: telegramChannel,
            templatePhoto: templatePhoto,
            chatId: chatsForSendingPrayerTimesModel.chat_id,
            timePerDay: chatsForSendingPrayerTimesModel.time_per_day,
            nextTime: chatsForSendingPrayerTimesModel.next_time,
            createAt: chatsForSendingPrayerTimesModel.create_at,
            updateAt: chatsForSendingPrayerTimesModel.update_at
        })
    }
}