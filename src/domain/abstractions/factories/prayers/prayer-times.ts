import {Factory} from "../factory";
import {PrayerTimes} from "../../../entities";

export interface PrayerTimesDto {
    fajr: string;
    shurooq: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
}

export interface PrayerTimesFactory extends Factory<PrayerTimesDto, PrayerTimes> {}