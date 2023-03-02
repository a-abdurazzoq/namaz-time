import {TelegramChatDto, TelegramChatFactory} from "../../abstractions/factories";
import {TelegramChat} from "../../entities";
import {injectable} from "inversify";

@injectable()
export class TelegramChatFactoryImpl implements TelegramChatFactory {
    create(dto: TelegramChatDto): TelegramChat {
        return new TelegramChat(
            dto.id,
            dto.name,
            dto.address,
            dto.chatType,
            dto.chatId,
            dto.createAt,
            dto.updateAt
        )
    }
}