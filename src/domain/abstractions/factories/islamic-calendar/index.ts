import {IslamicCalendar, IslamicMonth} from "../../../entities";
import {Factory} from "../factory";


export interface IslamicCalendarDto {
    id: string;
    year: number;
    dayNumber: number;
    month: IslamicMonth;
    gregorianTime: Date;
    createAt: Date;
    updateAt: Date;
}

export interface IslamicCalendarFactory extends Factory<IslamicCalendarDto, IslamicCalendar> {}