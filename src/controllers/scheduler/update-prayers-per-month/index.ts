import {SchedulerController} from "../../abstractions";
import {inject, injectable} from "inversify";
import {Symbols} from "../../../dependencies/symbols";
import {UpdateIslamicCalendarUseCase, UpdatePrayersPerMonthUseCase} from "../../../use-cases/abstractions";

@injectable()
export class UpdatePrayersPerMonthController implements SchedulerController {
    private readonly necessaryDayNumber: number

    constructor(
        @inject(Symbols.UseCases.UpdateIslamicCalendar) private updateIslamicCalendarUseCase: UpdateIslamicCalendarUseCase,
        @inject(Symbols.UseCases.UpdatePrayersPerMonth) private updatePrayersPerMonthUseCase: UpdatePrayersPerMonthUseCase
    ) {
        this.necessaryDayNumber = this.getDayNumberWithValidate(process.env.DAY_NUMBER_FOR_RUN_SCHEDULER_UPDATE_ISLAMIC_CALENDAR)
    }

    public async execute(): Promise<any> {
        await this.updateIslamicCalendarUseCase.execute(this.getMonthDate())
        await this.updatePrayersPerMonthUseCase.execute(this.getMonthDate())

        return
    }

    private getMonthDate():Date {
        if(this.isNeedTheCurrentMonth())
            return this.getCurrentMonth()

        return this.getNextMonth()
    }

    private getCurrentMonth(): Date {
        let date = new Date()
        date.setDate(1)
        date.setHours(0,0,0,0)

        return date
    }

    private getNextMonth(): Date {
        let date = new Date()
        date.setMonth(date.getMonth()+1)
        date.setDate(1)
        date.setHours(0,0,0,0)

        return date
    }

    private isNeedTheCurrentMonth(): boolean {
        let currentDate = new Date();
        currentDate.setHours(0,0,0,0)

        let necessaryDate = new Date();
        necessaryDate.setHours(0,0,0,0)

        if(this.necessaryDayNumber > 0)
            return true

        necessaryDate.setMonth(necessaryDate.getMonth()+1, 1)
        necessaryDate.setDate(this.necessaryDayNumber)

        return currentDate.getTime() < necessaryDate.getTime()
    }

    private getDayNumberWithValidate(dayNumber: any): never | number {
        let number = Number(dayNumber)

        if(isNaN(number))
            throw new Error("In env file not exist \"DAY_NUMBER_FOR_SCHEDULER_UPDATE_ISLAMIC_CALENDAR\"")

        return number
    }
}