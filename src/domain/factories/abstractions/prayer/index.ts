import {Factory} from "../factory";
import {Prayer} from "../../../entities/prayer";

export interface PrayerDto {
    name: string;
    time: Date;
    createAt: Date;
    updateAt: Date;
}

export interface PrayerFactory extends Factory<PrayerDto, Prayer> {}