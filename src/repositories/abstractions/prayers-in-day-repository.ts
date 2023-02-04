import {PrayersInDay} from "../../domain/entities";

export interface PrayersInDayRepository {
    getById(id: string): Promise<PrayersInDay>;
    getIslamicCalendarId(islamicCalendarId: string): Promise<PrayersInDay>;
}