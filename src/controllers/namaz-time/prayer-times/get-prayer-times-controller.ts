import {GetTodayPrayerTimesController} from "../../abstractions";
import {
    GetPrayerTimes,
    GetTodayPrayerTimesPresenter
} from "../../../presenters/abstractions/prayer-times/get-today-prayer-times-presenter";
import {inject, injectable} from "inversify";
import {Symbols} from "../../../dependencies/symbols";
import {GetTodayPrayerTimesUseCase} from "../../../use-cases/abstractions";

@injectable()
export class GetTodayPrayerTimesControllerImpl implements GetTodayPrayerTimesController {
    constructor(
        @inject(Symbols.UseCases.PrayerTimes.GetToday) private getTodayPrayerTimesUseCase: GetTodayPrayerTimesUseCase,
        @inject(Symbols.Presenters.PrayerTimes.GetToday) private getTodayPrayerTimesPresenter: GetTodayPrayerTimesPresenter
    ) {}
    public async execute(): Promise<GetPrayerTimes.Response> {
        const todayPrayerTimes = await this.getTodayPrayerTimesUseCase.execute()

        return this.getTodayPrayerTimesPresenter.print(todayPrayerTimes)
    }

}