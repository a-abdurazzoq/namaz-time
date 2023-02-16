import {PrayersInDay} from "../../domain/entities";

export interface PrayersInDayRepository {
    getById(id: string): Promise<PrayersInDay>;
    getIslamicCalendarId(islamicCalendarId: string): Promise<PrayersInDay>;
    insertPrayersPerMonth(prayersPerMonth: InsertPrayerTimesParams[]): Promise<PrayersInDay[]>;
    insertPrayerTimes(prayerTimes: InsertPrayerTimesParams): Promise<PrayersInDay>;
    deleteAll(): Promise<void>;
    hasPrayerTimesPerMonth(dateMonth: Date): Promise<boolean>
}

export interface InsertPrayerTimesParams {
    gregorianDate: Date;
    islamicDay: number
    fajr: string;
    shurooq: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
}