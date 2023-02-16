import {DistrictDto, DistrictFactory} from "../../abstractions/factories";
import {District} from "../../entities";
import {injectable} from "inversify";

@injectable()
export class DistrictFactoryImpl implements DistrictFactory {
    create(dto: DistrictDto): District {
        return new District(dto.id, dto.city, dto.name)
    }
}