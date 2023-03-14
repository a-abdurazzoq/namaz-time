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
import {PostDataFactory} from "../domain/abstractions/factories/post-for-telegram/post-data";

@injectable()
export class PostForTelegramRepositoryImpl implements PostForTelegramRepository {
    constructor(
        @inject(Symbols.Factories.PostData) private postDataFactory: PostDataFactory,
        @inject(Symbols.Factories.PostForTelegram) private PostForTelegramFactory: PostForTelegramFactory,
        @inject(Symbols.Repositories.TelegramChat) private TelegramChatRepository: TelegramChatRepository,
        @inject(Symbols.Repositories.TemplatePhoto) private templatePhotoRepository: TemplatePhotoRepository
    ) {}

    public async create(params: CreatePostForTelegramRepositoryParams): Promise<PostForTelegram> {
        let createdPostForTelegram = new PostForTelegramModel({
            telegram_chat_id: new Types.ObjectId(params.telegramChat.getId()),
            post_data: {
                chat_id: params.telegramChat.getChatId(),
                template_photo_id: new Types.ObjectId(params.templatePhoto.getId()),
                caption_for_post: params.captionForPost,
                description_in_photo: params.descriptionInPhoto
            },
            time_per_day: params.timePerDay,
            next_time: this.getGeneratedNextTime(params.timePerDay)
        })

        await createdPostForTelegram.save()

        return this.toEntity(createdPostForTelegram)
    }

    public async getAllLessAndEqualByNextTime(date: Date): Promise<PostForTelegram[]> {
        let getPostForTelegram = await PostForTelegramModel.find<IPostForTelegramModel>({next_time: {$lte: date}})

        return this.toEntities(getPostForTelegram)
    }

    public async getById(id: string): Promise<PostForTelegram> {
        let getPostForTelegram = await PostForTelegramModel.findById<IPostForTelegramModel>(id)

        if(!getPostForTelegram)
            throw new Error("Post for telegram not found by id")

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
            throw new Error("An error occurred while trying to update the next \"Post for telegram\" date")

        return this.toEntity(getPostForTelegram)
    }

    private getGeneratedNextTime(timePerDay: number): Date {
        let date = new Date()
        date.setDate(date.getDate()+1)
        date.setHours(0,0,0,0)
        date.setMilliseconds(timePerDay)

        return date
    }

    private toEntities(postForTelegramModel: IPostForTelegramModel[]): Promise<PostForTelegram[]> {
        let entities = postForTelegramModel.map(PostForTelegramModel => this.toEntity(PostForTelegramModel))

        return Promise.all(entities)
    }

    private async toEntity(postForTelegramModel: IPostForTelegramModel): Promise<PostForTelegram> {
        let TelegramChat = await this.TelegramChatRepository.getById(postForTelegramModel.telegram_chat_id.toHexString())
        let templatePhoto = await this.templatePhotoRepository.getById(postForTelegramModel.post_data.template_photo_id.toHexString())
        let postData = this.postDataFactory.create({
            templatePhoto: templatePhoto,
            chatId: postForTelegramModel.post_data.chat_id,
            descriptionInPhoto: postForTelegramModel.post_data.description_in_photo,
            captionForPost: postForTelegramModel.post_data.caption_for_post,
        })

        return this.PostForTelegramFactory.create({
            id: postForTelegramModel._id.toHexString(),
            TelegramChat: TelegramChat,
            postData: postData,
            timePerDay: postForTelegramModel.time_per_day,
            nextTime: postForTelegramModel.next_time,
            createAt: postForTelegramModel.create_at,
            updateAt: postForTelegramModel.update_at
        })
    }
}