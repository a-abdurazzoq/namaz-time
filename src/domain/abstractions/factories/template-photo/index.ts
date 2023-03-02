import {Factory} from "../factory";
import {TelegramChat, TemplatePhoto} from "../../../entities";

export interface TemplatePhotoDto {
    id: string;
    fileName: string;
    telegramChat: TelegramChat;
    createAt: Date;
    updateAt: Date;
}

export interface TemplatePhotoFactory extends Factory<TemplatePhotoDto, TemplatePhoto> {}