import {injectable} from "inversify";

import {PrayersInDay} from "../../entities";
import {PrayersInDayDto, PrayersInDayFactory} from "../../abstractions/factories";

@injectable()
export class PrayersInDayFactoryImpl implements PrayersInDayFactory {
    create(dto: PrayersInDayDto): PrayersInDay {
        return new PrayersInDay(
            dto.id,
            dto.islamicCalendar,
            dto.prayerTimes,
            dto.createAt,
            dto.updateAt
        )
    }
}