import {UpdateIslamicCalendarUseCase} from "../../abstractions";
import {inject, injectable} from "inversify";
import {Symbols} from "../../../dependencies/symbols";
import {AladhanClient} from "../../../clients/abstractions/aladhan-client";
import {InsertDays, IslamicCalendarRepository} from "../../../repositories/abstractions";

@injectable()
export class UpdateIslamicCalendarUseCaseImpl implements UpdateIslamicCalendarUseCase {
    constructor(
       @inject(Symbols.Clients.Aladhan) private aladhanClient: AladhanClient,
       @inject(Symbols.Repositories.IslamicCalendar) private islamicCalendarRepository: IslamicCalendarRepository
    ) {}

    public async execute(date: Date): Promise<void> {
        let hasCurrentMonth = await this.islamicCalendarRepository.hasMonth(date)

        if(hasCurrentMonth)
            return

        const getIslamicCalendar = await this.aladhanClient.getIslamicCalendarByMonth({
            year: date.getFullYear(),
            month: date.getMonth()+1
        })

        const islamicCalendar = getIslamicCalendar.map<InsertDays.Params>(islamicDay => ({
            year: Number(islamicDay.hijri.year),
            monthNumber: Number(islamicDay.hijri.month.number),
            dayNumber: Number(islamicDay.hijri.day),
            gregorianDate: new Date(Number(islamicDay.gregorian.year), Number(islamicDay.gregorian.month.number)-1, Number(islamicDay.gregorian.day))
        }))

        await this.islamicCalendarRepository.insertDays(islamicCalendar)

        return
    }
}