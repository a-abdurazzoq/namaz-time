import {Factory} from "../factory";
import {TelegramChannel} from "../../../entities";
import {Mosque} from "../../../entities";

export interface TelegramChannelDto {
    id: string;
    name: string;
    mosque: Mosque;
    chatId: number;
    createAt: Date;
    updateAt: Date;
}

export interface TelegramChannelFactory extends Factory<TelegramChannelDto, TelegramChannel> {}