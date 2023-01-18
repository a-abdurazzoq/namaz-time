import {Config, millisecond} from "../../abstractions/schduler";

export class ConfigScheduler implements Config {
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