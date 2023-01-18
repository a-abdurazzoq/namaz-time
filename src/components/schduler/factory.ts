import {SchedulerDto, SchedulerFactory} from "../abstractions/schduler";
import {Scheduler} from "./scheduler";
import {injectable} from "inversify";

@injectable()
export class SchedulerFactoryImpl implements SchedulerFactory {
    create(dto: SchedulerDto): Scheduler {
        return new Scheduler(
            dto.config,
            dto.controller,
            dto.logger
        )
    }
}