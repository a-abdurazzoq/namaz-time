import {TelegramChannelDto, TelegramChannelFactory} from "../../abstractions/factories";
import {TelegramChannel} from "../../entities";
import {injectable} from "inversify";

@injectable()
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