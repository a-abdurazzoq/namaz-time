import {SchedulerConfig, millisecond} from "../../abstractions/schduler";
import {injectable} from "inversify";

@injectable()
export class UpdatePrayersPerMonthSchedulerConfig implements SchedulerConfig {
    public getTimeInterval(): millisecond {
        return this.getTimeOfLastDayOfNextMonth()
    }

    private getTimeOfLastDayOfNextMonth(): millisecond {
        let currentDate = new Date();
        let nextDate = new Date(currentDate);

        nextDate.setDate(1)
        nextDate.setHours(0,0,0,0)
        nextDate.setMonth(nextDate.getMonth() + this.getIncrementMonthNumber(currentDate))
        nextDate.setDate(-1)
        nextDate.toLocaleDateString()

        return nextDate.getTime() - currentDate.getTime();
    }

    protected getIncrementMonthNumber(date: Date): 1 | 2 {
        let currentDate = new Date(date)
        let currentMonth = currentDate.getMonth()

        currentDate.setHours(0,0,0,0)
        currentDate.setDate(currentDate.getDate()+1)

        if (currentMonth === currentDate.getMonth())
            return 1

        return 2
    }
}