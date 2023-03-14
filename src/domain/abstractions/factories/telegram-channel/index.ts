import {Factory} from "../factory";
import {Address, TelegramChat, TelegramChatType} from "../../../entities";
export interface TelegramChatDto {
    id: string;
    name: string;
    address: Address;
    chatType: TelegramChatType;
    chatId: number;
    chatUsername: string;
    createAt: Date;
    updateAt: Date;
}

export interface TelegramChatFactory extends Factory<TelegramChatDto, TelegramChat> {}