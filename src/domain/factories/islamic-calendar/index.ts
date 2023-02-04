import {IslamicCalendar} from "../../entities";
import {IslamicCalendarDto, IslamicCalendarFactory} from "../../abstractions/factories/islamic-calendar";
import {injectable} from "inversify";

@injectable()
export class IslamicCalendarFactoryImpl implements IslamicCalendarFactory {
    create(dto: IslamicCalendarDto): IslamicCalendar {
        return new IslamicCalendar(
            dto.id,
            dto.year,
            dto.dayNumber,
            dto.month,
            dto.gregorianTime,
            dto.createAt,
            dto.updateAt
        )
    }
}