import {Factory} from "../factory";
import {TelegramChannel} from "../../../entities/telegram-channel";
import {Mosque} from "../../../entities/mosque";

export interface TelegramChannelDto {
    name: string;
    mosque: Mosque;
    chatId: number;
    createAt: Date;
    updateAt: Date;
}

export interface TelegramChannelFactory extends Factory<TelegramChannelDto, TelegramChannel> {}