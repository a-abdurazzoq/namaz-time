import {CreateRequestForRegister, RequestController} from "../../abstractions";
import {inject, injectable} from "inversify";
import {Symbols} from "../../../dependencies/symbols";
import {
    CreateRequestForRegisterUseCase
} from "../../../use-cases/abstractions";
import {Logger} from "../../../components/abstractions/logger";
import {
    CreateRequestForRegisterPresenter
} from "../../../presenters/abstractions/request/create-request-for-register-presenter";

@injectable()
export class RequestControllerImpl implements RequestController {
    constructor(
        @inject(Symbols.UseCases.Request.CreateForRegister) private readonly createRequestForRegisterUseCase: CreateRequestForRegisterUseCase,
        @inject(Symbols.UseCases.Request.CreateForRegister) private readonly createRequestForRegisterPresenter: CreateRequestForRegisterPresenter,
        @inject(Symbols.Infrastructures.Logger) private readonly logger: Logger
    ) {}
    public async createForRegister(params: CreateRequestForRegister.Params): Promise<CreateRequestForRegister.Response> {
        try {
            const request = await this.createRequestForRegisterUseCase.execute(params)

            await this.logger.print({
                result: {
                    _id: request.getId(),
                    TelegramChatLink: request.getTelegramChatLink(),
                    telegramUsername: request.getTelegramUsername(),
                    district: request.getDistrict().getName(),
                    city: request.getCity().getName(),
                    createAt: request.getCreateAt(),
                    updateAt: request.getUpdateAt()
                }
            })

            return this.createRequestForRegisterPresenter.print(request)
        }
        catch (error) {
            await this.logger.print({error: error})
            throw error
        }
    }
}