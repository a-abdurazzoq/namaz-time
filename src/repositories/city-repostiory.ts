import {CityRepository} from "./abstractions";
import {City} from "../domain/entities";
import {inject, injectable} from "inversify";
import {CityFactory} from "../domain/abstractions/factories";
import {Symbols} from "../dependencies/symbols";
import {CityModel, ICityModel} from "../models";

@injectable()
export class CityRepositoryImpl implements CityRepository {
    constructor(
        @inject(Symbols.Factories.City) private cityFactory: CityFactory
    ) {}

    public async getById(id: number): Promise<City> {
        let getCity = await CityModel.findById<ICityModel>(id)

        if(!getCity)
            throw new Error("City not found by id")

        return this.toEntity(getCity)
    }

    private toEntity(cityModel: ICityModel): City {
        return this.cityFactory.create({
            id: cityModel._id,
            name: cityModel.name
        })
    }
}