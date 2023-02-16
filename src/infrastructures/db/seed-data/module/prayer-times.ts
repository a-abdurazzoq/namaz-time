import {inject, injectable} from "inversify";

import {Symbols} from "../../../../dependencies/symbols";
import {SeedDataModule} from "../../../abstractions/seed-data";
import {Logger} from "../../../../components/abstractions/logger";
import {UpdatePrayersPerMonthUseCase} from "../../../../use-cases/abstractions";
import {PrayersInDayRepository} from "../../../../repositories/abstractions";

@injectable()
export class PrayerTimesSeedDataModule implements SeedDataModule {
    constructor(
        @inject(Symbols.Repositories.PrayersInDay) private prayersInDayRepository: PrayersInDayRepository,
        @inject(Symbols.UseCases.UpdatePrayersPerMonth) private updatePrayersPerMonthUseCase: UpdatePrayersPerMonthUseCase,
        @inject(Symbols.Infrastructures.Logger) private logger: Logger
    ) {
    }

    public async insert(): Promise<any> {
        await this.prayersInDayRepository.deleteAll()
        await this.updatePrayersPerMonthUseCase.execute(this.getDate())
        await this.logger.print({result: "Prayer times успешно добавлен"})

        return
    }

    private getDate(): Date {
        let date = new Date()
        date.setDate(1)
        date.setHours(0, 0, 0, 0)

        return date
    }
}