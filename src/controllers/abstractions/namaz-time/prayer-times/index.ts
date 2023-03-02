import {GetPrayerTimes} from "../../../../presenters/abstractions/prayer-times/get-today-prayer-times-presenter";

export interface PrayerTimesController {
    getTodayPrayerTimes(): Promise<GetPrayerTimes.Response>
}