import {SchedulerConfig} from "../abstractions/schduler";
import {Controller} from "../../controllers/abstractions";
import {Logger} from "../abstractions/logger";

export class Scheduler {
    private timer: NodeJS.Timer

    constructor(
        private config: SchedulerConfig,
        private controller: Controller,
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
            let result = await this.controller.execute()

            await this.logger.print({result: result})
        }
        catch (error) {
            await this.logger.print({error: error})
        }
        finally {
            this.setTimer()
        }
        return
    }

    private setTimer(): void {
        this.unsetTimer()

        this.timer = setTimeout(this.executeTime.bind(this), this.getNextTime())
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