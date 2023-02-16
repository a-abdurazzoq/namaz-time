import {Factory} from "../factory";
import {City, District} from "../../../entities";

export interface DistrictDto {
    id: number;
    city: City;
    name: string;
}
export interface DistrictFactory extends Factory<DistrictDto, District> {}
