import {RequestController} from "../../abstractions";
import {inject, injectable} from "inversify";
import {Symbols} from "../../../dependencies/symbols";
import {
    CreateRequestForRegisterUseCase
} from "../../../use-cases/abstractions";
import {Logger} from "../../../components/abstractions/logger";
import {
    CreateRequestForRegisterPresenter
} from "../../../presenters/abstractions";
import {
    GetAllRequestUseCase
} from "../../../use-cases/abstractions/api/namaz-time-api/request/get-all-request-use-case";
import {GetAllRequestPresenter} from "../../../presenters/abstractions/request/get-all-request-presenter";

@injectable()
export class RequestControllerImpl implements RequestController {
    constructor(
        @inject(Symbols.UseCases.Request.CreateForRegister) private readonly createRequestForRegisterUseCase: CreateRequestForRegisterUseCase,
        @inject(Symbols.Presenters.Request.CreateForRegister) private readonly createRequestForRegisterPresenter: CreateRequestForRegisterPresenter,
        @inject(Symbols.UseCases.Request.GetAll) private readonly getAllRequestUseCase: GetAllRequestUseCase,
        @inject(Symbols.Presenters.Request.GetAll) private readonly getAllRequestPresenter: GetAllRequestPresenter,
        @inject(Symbols.Infrastructures.Logger) private readonly logger: Logger
    ) {}
    public async createForRegister(params: RequestController.CreateForRegister.Params): Promise<RequestController.CreateForRegister.Response> {
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

    public async getAll(): Promise<RequestController.GetAll.Response> {
        let requests = await this.getAllRequestUseCase.execute()

        return this.getAllRequestPresenter.print(requests)
    }
}