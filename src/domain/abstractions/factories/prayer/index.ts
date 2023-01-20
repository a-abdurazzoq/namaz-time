import {Factory} from "../factory";
import {Prayer} from "../../../entities";

export interface PrayerDto {
    id: string;
    name: string;
    time: Date;
    createAt: Date;
    updateAt: Date;
}

export interface PrayerFactory extends Factory<PrayerDto, Prayer> {}