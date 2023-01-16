import {TelegramChannelDto, TelegramChannelFactory} from "../abstractions/telegram-channel";
import {TelegramChannel} from "../../entities/telegram-channel";

export class TelegramChannelFactoryImpl implements TelegramChannelFactory {
    create(dto: TelegramChannelDto): TelegramChannel {
        return new TelegramChannel(
            dto.name,
            dto.mosque,
            dto.chatId,
            dto.createAt,
            dto.updateAt
        )
    }
}