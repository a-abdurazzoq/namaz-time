import {Factory} from "../factory";
import {PostForTelegram, TelegramChat, TemplatePhoto} from "../../../entities";

export interface PostForTelegramDto {
    id: string;
    TelegramChat: TelegramChat;
    templatePhoto: TemplatePhoto;
    chatId: number;
    timePerDay: number;
    nextTime: Date;
    createAt: Date;
    updateAt: Date;
}

export interface PostForTelegramFactory extends Factory<PostForTelegramDto, PostForTelegram> {}