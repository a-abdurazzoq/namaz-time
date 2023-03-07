import {SchedulerConfig} from "../abstractions/schduler";
import {SchedulerController} from "../../controllers/abstractions";
import {Logger} from "../abstractions/logger";

export class Scheduler {
    private timer: NodeJS.Timer

    constructor(
        private config: SchedulerConfig,
        private controller: SchedulerController,
        private logger: Logger
    ) {}

    public async start(): Promise<void> {
        await this.executeTime()
        return
    }

    public async stop(): Promise<void> {
        this.unsetTimer()
        return
    }

    private async executeTime(): Promise<void> {
        try {
            await this.logger.print({info: "Время выполнения задача"})

            let result = await this.controller.execute()

            await this.logger.print({result: result})
        }
        catch (error) {
            await this.logger.print({error: error})
        }
        finally {
            this.setTimer()
        }
        await this.logger.print({info: "Задача завершена"})
        return
    }

    private loggingNextRunTime(millisecond: number): void {
        let currentDate = new Date()
        currentDate.setMilliseconds(currentDate.getMilliseconds()+millisecond)

        let nextTimeInTextFormat = Intl.DateTimeFormat("mn-MN", {dateStyle: "short", timeStyle: "medium"}).format(currentDate)

        this.logger.print({alert: `Следующее время выполнения в ${nextTimeInTextFormat}`})
    }

    private setTimer(): void {
        this.unsetTimer()

        let nextTime = this.getNextTime()

        this.timer = setTimeout(this.executeTime.bind(this), nextTime)
        this.loggingNextRunTime(nextTime)

        return
    }

    private unsetTimer(): void {
        if(!this.timer)
            clearTimeout(this.timer)
        return
    }

    private getNextTime(): number {
        return this.config.getTimeInterval()
    }

}