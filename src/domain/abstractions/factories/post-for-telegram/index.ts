import {Factory} from "../factory";
import {PostForTelegram, TelegramChat} from "../../../entities";
import {PostData} from "../../../entities/post-for-telegram/post-data";

export interface PostForTelegramDto {
    id: string;
    TelegramChat: TelegramChat;
    postData: PostData;
    timePerDay: number;
    nextTime: Date;
    createAt: Date;
    updateAt: Date;
}

export interface PostForTelegramFactory extends Factory<PostForTelegramDto, PostForTelegram> {}