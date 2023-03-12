import {inject, injectable} from "inversify";

import {Symbols} from "../../../../dependencies/symbols";
import {SeedDataModule} from "../../../abstractions";
import {Logger} from "../../../../components/abstractions/logger";
import {UpdateIslamicCalendarUseCase} from "../../../../use-cases/abstractions";
import {IslamicCalendarRepository} from "../../../../repositories/abstractions";

@injectable()
export class IslamicCalendarSeedDataModule implements SeedDataModule {
    constructor(
        @inject(Symbols.Repositories.IslamicCalendar) private islamicCalendarRepository: IslamicCalendarRepository,
        @inject(Symbols.UseCases.UpdateIslamicCalendar) private updateIslamicCalendarUseCase: UpdateIslamicCalendarUseCase,
        @inject(Symbols.Infrastructures.Logger) private logger: Logger
    ) {
    }

    public async insert(): Promise<any> {
        await this.islamicCalendarRepository.deleteAll()
        await this.updateIslamicCalendarUseCase.execute(this.getDate())
        await this.logger.print({result: "Islamic calendar успешно добавлен"})

        return
    }

    private getDate(): Date {
        let date = new Date()
        date.setDate(1)
        date.setHours(0, 0, 0, 0)

        return date
    }
}