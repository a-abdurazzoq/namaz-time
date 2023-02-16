import {UseCase} from "../../../index";
import {PrayersInDay} from "../../../../../domain/entities";

export interface GetTodayPrayerTimesUseCase extends UseCase<void, PrayersInDay> {}