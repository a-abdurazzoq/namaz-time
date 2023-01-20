import {Factory} from "../factory";
import {District} from "../../../entities";

export interface DistrictDto {
    id: number;
    name: string;
}
export interface DistrictFactory extends Factory<DistrictDto, District> {}
