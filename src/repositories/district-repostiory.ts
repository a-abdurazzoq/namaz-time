import {DistrictRepository} from "./abstractions";
import {District} from "../domain/entities";
import {inject, injectable} from "inversify";
import {DistrictFactory} from "../domain/abstractions/factories";
import {Symbols} from "../dependencies/symbols";
import {DistrictModel, IDistrictModel} from "../models";

@injectable()
export class DistrictRepositoryImpl implements DistrictRepository {
    constructor(
        @inject<DistrictFactory>(Symbols.Factories.District) private DistrictFactory: DistrictFactory
    ) {}

    public async getById(id: number): Promise<District> {
        let getDistrict = await DistrictModel.findById<IDistrictModel>(id)

        if(!getDistrict)
            throw new Error("District not found by id")

        return this.toEntity(getDistrict)
    }

    private toEntity(districtModel: IDistrictModel): District {
        return this.DistrictFactory.create({
            id: districtModel._id,
            name: districtModel.name
        })
    }
}