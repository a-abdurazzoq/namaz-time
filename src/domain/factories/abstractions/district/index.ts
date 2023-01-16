import {Factory} from "../factory";
import {District} from "../../../entities/district";

export interface DistrictDto {
    id: string;
    name: string;
}
export interface DistrictFactory extends Factory<DistrictDto, District> {}
