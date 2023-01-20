import {SchedulerConfig, millisecond} from "../../abstractions/schduler";
import {injectable} from "inversify";

@injectable()
export class ConfigScheduler implements SchedulerConfig {
    getTimeInterval(): millisecond {
        return this.getTimeByMinuteInterval()
    }

    private getTimeByHourInterval(): millisecond {
        let currentDate = new Date()
        let date = new Date()
        date.setHours(currentDate.getHours()+1, 0,0,0)


        return date.getTime() - currentDate.getTime()
    }

    private getTimeByMinuteInterval(): millisecond {
        let intervalMinutes = 10
        let currentDate = new Date()
        let date = new Date()

        date.setMinutes(currentDate.getMinutes()+intervalMinutes, 0,0)
        date.setMinutes(date.getMinutes()-(date.getMinutes() % intervalMinutes), 0,0)


        return date.getTime() - currentDate.getTime()
    }
}