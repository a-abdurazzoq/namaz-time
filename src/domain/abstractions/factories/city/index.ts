import {Factory} from "../factory";
import {City} from "../../../entities";

export interface CityDto {
    id: number;
    name: string;
}

export interface CityFactory extends Factory<CityDto, City> {}