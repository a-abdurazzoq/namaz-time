import {UpdatePrayersPerMonthUseCase} from "../../abstractions";
import {inject, injectable} from "inversify";
import {NamozVaqtiClient} from "../../../clients/abstractions/namoz-vaqti-client";
import {Symbols} from "../../../dependencies/symbols";
import {PrayersInDayRepository} from "../../../repositories/abstractions";


@injectable()
export class UpdatePrayersPerMonthUseCaseImpl implements UpdatePrayersPerMonthUseCase {
    constructor(
        @inject(Symbols.Clients.NamozVaqti) private namozVaqtiClient: NamozVaqtiClient,
        @inject(Symbols.Repositories.PrayersInDay) private prayersInDayRepository: PrayersInDayRepository
    ) {
    }
    public async execute(date: Date): Promise<void> {
        const hasPrayerTimesInCurrentMonth = await this.prayersInDayRepository.hasPrayerTimesPerMonth(date)

        if(hasPrayerTimesInCurrentMonth)
            return

        const prayerTimesByMonth = await this.namozVaqtiClient.getPrayerTimesByMonth(date.getMonth()+1)

        await this.prayersInDayRepository.insertPrayersPerMonth(prayerTimesByMonth.map(prayerTimes => ({
            ...prayerTimes,
            gregorianDate: new Date(date.setDate(prayerTimes.gregorianDay)),
        })))

        return
    }

}