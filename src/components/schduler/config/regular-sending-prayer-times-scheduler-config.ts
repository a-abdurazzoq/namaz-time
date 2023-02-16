import {SchedulerConfig, millisecond} from "../../abstractions/schduler";
import {injectable} from "inversify";

@injectable()
export class RegularSendingPrayerTimesSchedulerConfig implements SchedulerConfig {
    private readonly necessaryDayNumber: number
    constructor() {
        this.necessaryDayNumber = this.getDayNumberWithValidate(process.env.DAY_NUMBER_FOR_RUN_SCHEDULER_UPDATE_ISLAMIC_CALENDAR)
    }

    public getTimeInterval(): millisecond {
        return this.getTimeByMinuteInterval()
    }

    private getTimeByHourInterval(): millisecond {
        let currentDate = new Date();
        let nextHour = new Date(currentDate);

        nextHour.setHours(nextHour.getHours() + 1, 0, 0, 0);

        return nextHour.getTime() - currentDate.getTime();
    }

    private getTimeByMinuteInterval(): millisecond {
        let intervalMinutes = 10
        let currentDate = new Date()
        let date = new Date()

        date.setMinutes(currentDate.getMinutes()+intervalMinutes, 0,0)
        date.setMinutes(date.getMinutes()-(date.getMinutes() % intervalMinutes), 0,0)


        return date.getTime() - currentDate.getTime()
    }

    private getDayNumberWithValidate(dayNumber: any): never | number {
        let number = Number(dayNumber)

        if(isNaN(number))
            throw new Error("In env file not exist \"DAY_NUMBER_FOR_SCHEDULER_UPDATE_ISLAMIC_CALENDAR\"")

        return number
    }
}