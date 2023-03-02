import {PostForTelegram, TelegramChat, TemplatePhoto} from "../../domain/entities";

export interface GeneratePhotoByPostForTelegramParams {
    PostForTelegram: PostForTelegram;
    necessaryDate: Date;
}

export interface TemplatePhotoRepository {
    getById(id: string): Promise<TemplatePhoto>;
    create(params: CreateTemplatePhotoRepositoryParams): Promise<TemplatePhoto>;
    generatePhotoByPostForTelegram(params: GeneratePhotoByPostForTelegramParams): Promise<Buffer>;
}

export interface CreateTemplatePhotoRepositoryParams {
    telegramChat: TelegramChat;
    htmlTemplateFileBase64: string;
}