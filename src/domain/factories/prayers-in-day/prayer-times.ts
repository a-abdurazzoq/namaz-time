import {injectable} from "inversify";

import {PrayerTimes} from "../../entities";
import {PrayerTimesDto, PrayerTimesFactory} from "../../abstractions/factories";

@injectable()
export class PrayerTimesFactoryImpl implements PrayerTimesFactory {
    create(dto: PrayerTimesDto): PrayerTimes {
        return new PrayerTimes(
            dto.fajr,
            dto.shurooq,
            dto.dhuhr,
            dto.asr,
            dto.maghrib,
            dto.isha,
        )
    }
}