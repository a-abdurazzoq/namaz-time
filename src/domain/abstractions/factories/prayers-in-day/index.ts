import {Factory} from "../factory";
import {IslamicCalendar, PrayersInDay} from "../../../entities";
import {PrayerTimes} from "../../../entities";

export interface PrayersInDayDto {
    id: string;
    islamicCalendar: IslamicCalendar;
    prayerTimes: PrayerTimes;
    createAt: Date;
    updateAt: Date;
}

export interface PrayersInDayFactory extends Factory<PrayersInDayDto, PrayersInDay> {}