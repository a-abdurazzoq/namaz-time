import {injectable} from "inversify";
import {RequestDto, RequestFactory} from "../../abstractions/factories/request";
import {Request} from "../../entities/request";

@injectable()
export class RequestFactoryImpl implements RequestFactory {
    public create(dto: RequestDto): Request {
        return new Request(
            dto.id,
            dto.telegramChannelLink,
            dto.telegramUsername,
            dto.cityId,
            dto.districtId,
            dto.createAt,
            dto.updateAt
        )
    }
}