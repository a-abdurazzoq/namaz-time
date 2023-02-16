import {CityRepository, CreateDistrictRepositoryParams, DistrictRepository} from "./abstractions";
import {District} from "../domain/entities";
import {inject, injectable} from "inversify";
import {DistrictFactory} from "../domain/abstractions/factories";
import {Symbols} from "../dependencies/symbols";
import {DistrictModel, IDistrictModel} from "../models";

@injectable()
export class DistrictRepositoryImpl implements DistrictRepository {
    constructor(
        @inject(Symbols.Factories.District) private districtFactory: DistrictFactory,
        @inject(Symbols.Repositories.City) private cityRepository: CityRepository
    ) {
    }

    public async create(params: CreateDistrictRepositoryParams): Promise<District> {
        const city = new DistrictModel({
            _id: params.id,
            city_id: params.city_id,
            name: params.name
        })

        await city.save()

        return this.toEntity(city)
    }

    public async deleteAll(): Promise<void> {
        await DistrictModel.deleteMany({})

        return
    }

    public async getById(id: number): Promise<District> {
        let getDistrict = await DistrictModel.findById<IDistrictModel>(id)

        if(!getDistrict)
            throw new Error("District not found by id")

        return this.toEntity(getDistrict)
    }

    private async toEntity(districtModel: IDistrictModel): Promise<District> {
        let city = await this.cityRepository.getById(districtModel.city_id)

        return this.districtFactory.create({
            id: districtModel._id,
            city: city,
            name: districtModel.name
        })
    }
}