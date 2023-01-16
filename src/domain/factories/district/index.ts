import {DistrictDto, DistrictFactory} from "../abstractions/district";
import {District} from "../../entities/district";

export class DistrictFactoryImpl implements DistrictFactory {
    create(dto: DistrictDto): District {
        return new District(dto.id, dto.name)
    }
}