import {IslamicCalendar} from "../../domain/entities";

export interface IslamicCalendarRepository {
    getDayById(id: string): Promise<IslamicCalendar>;
    getDayByGregorianTime(date: Date): Promise<IslamicCalendar>;
    insertDays(params: InsertDays.Params): Promise<InsertDays.Response>
}

export namespace InsertDays {
    export interface Params {
        year: number
        dayNumber: number
        monthNumber: number
        gregorianTime: Date
    }

    export type Response = IslamicCalendar[]
}