import {Controller} from "../../";
import {GetPrayerTimes} from "../../../../presenters/abstractions/prayer-times/get-today-prayer-times-presenter";

export interface GetTodayPrayerTimesController extends Controller<void, GetPrayerTimes.Response> {}