import {injectable} from "inversify";
import {RequestDto, RequestFactory} from "../../abstractions/factories/request";
import {Request} from "../../entities/request";

@injectable()
export class RequestFactoryImpl implements RequestFactory {
    public create(dto: RequestDto): Request {
        return new Request(
            dto.id,
            dto.TelegramChatLink,
            dto.telegramUsername,
            dto.city,
            dto.district,
            dto.createAt,
            dto.updateAt
        )
    }
}