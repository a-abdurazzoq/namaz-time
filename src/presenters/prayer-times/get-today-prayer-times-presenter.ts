import {GetPrayerTimes, GetTodayPrayerTimesPresenter} from "../abstractions/prayer-times/get-today-prayer-times-presenter";
import {injectable} from "inversify";

@injectable()
export class GetTodayPrayerTimesPresenterImpl implements GetTodayPrayerTimesPresenter {
    print(params: GetPrayerTimes.Params): GetPrayerTimes.Response {
        return {
            id: params.getId(),
            prayer_times: {
                fajr: params.getPrayerTimes().getFajr(),
                shurooq: params.getPrayerTimes().getShurooq(),
                dhuhr: params.getPrayerTimes().getDhuhr(),
                asr: params.getPrayerTimes().getAsr(),
                maghrib: params.getPrayerTimes().getMaghrib(),
                isha: params.getPrayerTimes().getIsha()
            },
            gregorian_date: params.getIslamicCalendar().getGregorianDate().getTime(),
            islamic_date: {
                year: params.getIslamicCalendar().getYear(),
                month: {
                    name: params.getIslamicCalendar().getMonth().getName(),
                    number: params.getIslamicCalendar().getMonth().getNumber()
                },
                day: params.getIslamicCalendar().getDayNumber()
            }
        }
    }

}