import {Presenter} from "../index";
import {PrayersInDay} from "../../../domain/entities";

export interface GetTodayPrayerTimesPresenter extends Presenter<GetPrayerTimes.Params, GetPrayerTimes.Response> {}

export namespace GetPrayerTimes {
    export type Params = PrayersInDay;

    export interface Response {
        id: string;
        gregorian_date: number;
        prayer_times: {
            fajr: string;
            dhuhr: string;
            shurooq: string;
            asr: string;
            maghrib: string;
            isha: string;
        }
        islamic_date: {
            year: number;
            month: {
                number: number;
                name: string;
            }
            day: number;
        }
    }
}