import {CityDto, CityFactory} from "../../abstractions/factories";
import {City} from "../../entities";
import {injectable} from "inversify";

@injectable()
export class CityFactoryImpl implements CityFactory {
    create(dto: CityDto): City {
        return new City(
            dto.id,
            dto.name
        )
    }
}