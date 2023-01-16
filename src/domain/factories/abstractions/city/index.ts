import {Factory} from "../factory";
import {City} from "../../../entities/city";

export interface CityDto {
    id: string;
    name: string;
}

export interface CityFactory extends Factory<CityDto, City> {}