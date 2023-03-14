import {createRequestParams, RequestRepository} from "./abstractions";
import {inject, injectable} from "inversify";
import {Symbols} from "../dependencies/symbols";
import {IRequestModel, RequestModel} from "../models";
import {RequestFactory} from "../domain/abstractions/factories/request";
import {CityRepository, DistrictRepository} from "./abstractions";
import {Request} from "../domain/entities/request";

@injectable()
export class RequestRepositoryImpl implements RequestRepository {
    constructor(
       @inject(Symbols.Factories.Request) private readonly requestFactory: RequestFactory,
       @inject(Symbols.Repositories.City) private readonly cityRepository: CityRepository,
       @inject(Symbols.Repositories.District) private readonly districtRepository: DistrictRepository
    ) {}

    public async getById(requestId: string): Promise<Request> {
        let getRequest = await RequestModel.findById(requestId)

        if(!getRequest)
            throw new Error("Request not found by id")

        return this.toEntity(getRequest)
    }

    public async getAll(): Promise<Request[]> {
        let getRequest = await RequestModel.find()

        return this.toEntities(getRequest)
    }

    public async create(params: createRequestParams): Promise<Request> {
        let requestModel = new RequestModel({
            telegram_channel_link: params.TelegramChatLink,
            telegram_username: params.telegramUsername,
            district_id: params.districtId,
            city_id: params.cityId
        })

        await requestModel.save()

        return this.toEntity(requestModel)
    }

    private toEntities(requestModels: IRequestModel[]): Promise<Request[]> {
        let entities = requestModels.map(requestModel => this.toEntity(requestModel))

        return Promise.all(entities)
    }

    private async toEntity(requestModel: IRequestModel): Promise<Request> {
        const city = await this.cityRepository.getById(requestModel.city_id)
        const district = await this.districtRepository.getById(requestModel.district_id)

        return this.requestFactory.create({
            id: requestModel._id.toHexString(),
            telegramUsername: requestModel.telegram_username,
            TelegramChatLink: requestModel.telegram_channel_link,
            district: district,
            city: city,
            createAt: requestModel.create_at,
            updateAt: requestModel.update_at
        })
    }
}