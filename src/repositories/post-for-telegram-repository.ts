import {
    CreatePostForTelegramRepositoryParams,
    PostForTelegramRepository,
    TelegramChatRepository,
    TemplatePhotoRepository
} from "./abstractions";
import {PostForTelegram} from "../domain/entities";
import {inject, injectable} from "inversify";
import {PostForTelegramFactory} from "../domain/abstractions/factories";
import {Symbols} from "../dependencies/symbols";
import {PostForTelegramModel, IPostForTelegramModel} from "../models";
import {Types} from "mongoose";

@injectable()
export class PostForTelegramRepositoryImpl implements PostForTelegramRepository {
    constructor(
        @inject(Symbols.Factories.PostForTelegram) private PostForTelegramFactory: PostForTelegramFactory,
        @inject(Symbols.Repositories.TelegramChat) private TelegramChatRepository: TelegramChatRepository,
        @inject(Symbols.Repositories.TemplatePhoto) private templatePhotoRepository: TemplatePhotoRepository
    ) {}

    public async create(params: CreatePostForTelegramRepositoryParams): Promise<PostForTelegram> {
        let createdPostForTelegram = new PostForTelegramModel({
            telegram_channel_id: new Types.ObjectId(params.telegramChat.getId()),
            chat_id: new Types.ObjectId(params.telegramChat.getChatId()),
            template_photo_id: new Types.ObjectId(params.templatePhoto.getId()),
            time_per_day: params.timePerDay,
            next_time: this.getGeneratedNextTime(params.timePerDay)
        })

        await createdPostForTelegram.save()

        return this.toEntity(createdPostForTelegram)
    }

    public async getAllLessAndEqualByNextTime(date: Date): Promise<PostForTelegram[]> {
        let getChatsForSendingPrayerTimes = await PostForTelegramModel.find<IPostForTelegramModel>({next_time: {$lte: date}})

        return this.toEntities(getChatsForSendingPrayerTimes)
    }

    public async getById(id: string): Promise<PostForTelegram> {
        let getPostForTelegram = await PostForTelegramModel.findById<IPostForTelegramModel>(id)

        if(!getPostForTelegram)
            throw new Error("Chat for sending prayers in day times not found by id")

        return this.toEntity(getPostForTelegram)
    }

    public async updateNextTime(PostForTelegram: PostForTelegram): Promise<PostForTelegram> {
        let getPostForTelegram = await PostForTelegramModel.findByIdAndUpdate(PostForTelegram.getId(), {
            $set: {
                next_time: PostForTelegram.updateNextTime().getTime(),
                update_at: Date.now()
            }
        })

        if(!getPostForTelegram)
            throw new Error("An error occurred while trying to update the next \"Chat for sending prayer times\" date")

        return this.toEntity(getPostForTelegram)
    }

    private getGeneratedNextTime(timePerDay: number): Date {
        let date = new Date()
        date.setDate(date.getDate()+1)
        date.setHours(0,0,0,0)
        date.setMilliseconds(timePerDay)

        return date
    }

    private toEntities(chatsForSendingPrayerTimesModel: IPostForTelegramModel[]): Promise<PostForTelegram[]> {
        let entities = chatsForSendingPrayerTimesModel.map(PostForTelegramModel => this.toEntity(PostForTelegramModel))

        return Promise.all(entities)
    }

    private async toEntity(chatsForSendingPrayerTimesModel: IPostForTelegramModel): Promise<PostForTelegram> {
        let TelegramChat = await this.TelegramChatRepository.getById(chatsForSendingPrayerTimesModel.telegram_channel_id.toHexString())
        let templatePhoto = await this.templatePhotoRepository.getById(chatsForSendingPrayerTimesModel.template_photo_id.toHexString())

        return this.PostForTelegramFactory.create({
            id: chatsForSendingPrayerTimesModel._id.toHexString(),
            TelegramChat: TelegramChat,
            templatePhoto: templatePhoto,
            chatId: chatsForSendingPrayerTimesModel.chat_id,
            timePerDay: chatsForSendingPrayerTimesModel.time_per_day,
            nextTime: chatsForSendingPrayerTimesModel.next_time,
            createAt: chatsForSendingPrayerTimesModel.create_at,
            updateAt: chatsForSendingPrayerTimesModel.update_at
        })
    }
}