import {IslamicCalendar} from "../../domain/entities";
import {Types} from "mongoose";

export interface IslamicCalendarRepository {
    getDayById(id: string): Promise<IslamicCalendar>;
    getDayByGregorianTime(date: Date): Promise<IslamicCalendar>;
    getDayByGregorianTimeAndIslamicDay(params: GetDayByGregorianTimeAndIslamicDay.Params): Promise<IslamicCalendar>;
    getDaysIdPerMonthByDate(date: Date): Promise<Types.ObjectId[]>
    insertDays(params: InsertDays.Params[]): Promise<InsertDays.Response>;
    deleteAll(): Promise<void>;
    hasMonth(date: Date): Promise<boolean>
}

export namespace InsertDays {
    export interface Params {
        year: number
        dayNumber: number
        monthNumber: number
        gregorianDate: Date
    }

    export type Response = IslamicCalendar[]
}

export namespace GetDayByGregorianTimeAndIslamicDay {
    export interface Params {
        islamicDay: number
        gregorianDate: Date
    }

    export type Response = IslamicCalendar[]
}

