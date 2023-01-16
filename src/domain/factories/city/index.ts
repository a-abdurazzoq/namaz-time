import {CityDto, CityFactory} from "../abstractions/city";
import {City} from "../../entities/city";

export class CityFactoryImpl implements CityFactory {
    create(dto: CityDto): City {
        return new City(
            dto.id,
            dto.name
        )
    }
}