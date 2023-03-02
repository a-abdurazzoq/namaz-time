import {PostForTelegramDto, PostForTelegramFactory} from "../../abstractions/factories";
import {PostForTelegram} from "../../entities";
import {injectable} from "inversify";

@injectable()
export class PostForTelegramFactoryImpl implements PostForTelegramFactory {
    create(dto: PostForTelegramDto): PostForTelegram {
        return new PostForTelegram(
            dto.id,
            dto.TelegramChat,
            dto.templatePhoto,
            dto.chatId,
            dto.timePerDay,
            dto.nextTime,
            dto.createAt,
            dto.updateAt
        )
    }
}