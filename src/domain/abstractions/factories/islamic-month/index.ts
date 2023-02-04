import {Factory} from "../factory";
import {IslamicMonth} from "../../../entities";

export interface IslamicMonthDto {
    id: string;
    number: number;
    name: string;
}

export interface IslamicMonthFactory extends Factory<IslamicMonthDto, IslamicMonth> {}