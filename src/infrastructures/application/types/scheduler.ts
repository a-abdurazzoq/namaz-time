import {Application} from "../../abstractions/application";
import {inject, injectable} from "inversify";
import {Symbols} from "../../../dependencies/symbols";
import {SchedulerConfig, SchedulerFactory} from "../../../components/abstractions/schduler";
import {SchedulerController} from "../../../controllers/abstractions";
import {Storage} from "../../abstractions";
import {Scheduler} from "../../../components/schduler";
import {Logger} from "../../../components/abstractions/logger";

@injectable()
export class SchedulerApplicationImpl implements Application {
    private scheduler: Scheduler

    constructor(
        @inject(Symbols.Infrastructures.Logger) private logger: Logger,
        @inject(Symbols.Infrastructures.Storage) private storage: Storage,
        @inject(Symbols.Factories.Scheduler) private schedulerFactory: SchedulerFactory,
        @inject(Symbols.Configs.Scheduler) private config: SchedulerConfig,
        @inject(Symbols.Controllers.Scheduler) private controller: SchedulerController
    ) {}

    public async start(): Promise<void> {
        try {
            this.scheduler = this.schedulerFactory.create({
                logger: this.logger,
                controller: this.controller,
                config: this.config
            })

            await this.storage.open()
            await this.scheduler.start()

            await this.logger.print({info: "Планировщик успешно запущен"})
        }
        catch (error) {
            await this.logger.print({error: "Произошла ошибка при запуске планировщик"})
            await this.logger.print({error: error})
        }

        return
    }

    public async stop(): Promise<void> {
        await this.scheduler.stop()
        await this.storage.close()
        return
    }

}