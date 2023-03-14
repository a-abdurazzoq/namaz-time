import {PostForTelegram, TelegramChat, TemplatePhoto} from "../../domain/entities";

export interface PostForTelegramRepository {
    getById(id: string): Promise<PostForTelegram>;
    getAllLessAndEqualByNextTime(date: Date): Promise<PostForTelegram[]>;
    create(params: CreatePostForTelegramRepositoryParams): Promise<PostForTelegram>
    updateNextTime(PostForTelegram: PostForTelegram): Promise<PostForTelegram>;
}

export interface CreatePostForTelegramRepositoryParams {
    telegramChat: TelegramChat;
    templatePhoto: TemplatePhoto;
    timePerDay: number;
    captionForPost: string;
    descriptionInPhoto: string;
}