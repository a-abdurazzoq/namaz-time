import {SchedulerConfig, millisecond} from "../../abstractions/schduler";
import {injectable} from "inversify";

@injectable()
export class ConfigScheduler implements SchedulerConfig {
    getTimeInterval(): millisecond {
        return this.getTimeByHourInterval()
    }

    private getTimeByHourInterval(): millisecond {
        let currentDate = new Date()
        let date = new Date()
        date.setHours(currentDate.getHours()+1, 0,0,0)


        return date.getTime() - currentDate.getTime()
    }
}