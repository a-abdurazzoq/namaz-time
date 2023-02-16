import {GetTodayPrayerTimesUseCase} from "../../../abstractions";
import {PrayersInDay} from "../../../../domain/entities";
import {PrayersInDayRepository} from "../../../../repositories/abstractions";
import {inject, injectable} from "inversify";
import {Symbols} from "../../../../dependencies/symbols";

@injectable()
export class GetPrayerTimesUseCaseImpl implements GetTodayPrayerTimesUseCase {
    constructor(
       @inject(Symbols.Repositories.PrayersInDay) private readonly prayersInDayRepository: PrayersInDayRepository
    ) {}

    public async execute(): Promise<PrayersInDay> {
        let currentDate = new Date()
        currentDate.setHours(0, 0, 0, 0)

        return this.prayersInDayRepository.getPrayerTimesByDate(currentDate)
    }
}