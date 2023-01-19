import {Application} from "../../abstractions/application";
import {inject, injectable} from "inversify";
import {Symbols} from "../../../dependencies/symbols";
import {SchedulerConfig, SchedulerFactory} from "../../../components/abstractions/schduler";
import {Controller} from "../../../controllers/abstractions";
import {Storage} from "../../abstractions";
import {Scheduler} from "../../../components/schduler";
import {Logger} from "../../../components/abstractions/logger";

@injectable()
export class SchedulerApplicationImpl implements Application {
    private scheduler: Scheduler

    constructor(
        @inject<Logger>(Symbols.Infrastructures.Logger) private logger: Logger,
        @inject<Storage>(Symbols.Infrastructures.Storage) private storage: Storage,
        @inject<SchedulerFactory>(Symbols.Factories.Scheduler) private schedulerFactory: SchedulerFactory,
        @inject<SchedulerConfig>(Symbols.Configs.Scheduler) private config: SchedulerConfig,
        @inject<Controller>(Symbols.Controllers.Scheduler) private controller: Controller,
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

            await this.logger.print({result: "Планировщик успешно запущен"})
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