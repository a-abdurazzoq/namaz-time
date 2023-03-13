import {RouterBase, RRequest} from "../../abstractions/http/routers";
import {inject, injectable} from "inversify";
import {Symbols} from "../../../../dependencies/symbols";
import {CreateRequestForRegister, RequestController} from "../../../../controllers/abstractions";
import {Http} from "../decorators";


namespace RequestRouter {
    export interface CreateBody {
        telegram_chat_link: string;
        telegram_username: string;
        city_id: number;
        district_id: number;
    }
}

@injectable()
@Http.Router("request")
export class RequestRouterImpl implements RouterBase {
    constructor(
        @inject(Symbols.Controllers.Request) private readonly requestController: RequestController
    ) {}

    @Http.Post()
    public async create(req: RRequest<RequestRouter.CreateBody>): Promise<CreateRequestForRegister.Response> {
        return await this.requestController.createForRegister({
            TelegramChatLink: req.body.telegram_chat_link,
            telegramUsername: req.body.telegram_username,
            districtId: req.body.district_id,
            cityId: req.body.city_id
        })
    }
}