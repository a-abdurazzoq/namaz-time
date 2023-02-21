import {Factory} from "../../../domain/abstractions/factories/factory";
import {Scheduler} from "../../schduler";
import {SchedulerConfig} from "./schedulerConfig";
import {SchedulerController} from "../../../controllers/abstractions";
import {Logger} from "../logger";

export interface SchedulerDto {
    config: SchedulerConfig;
    controller: SchedulerController;
    logger: Logger;
}

export interface SchedulerFactory extends Factory<SchedulerDto, Scheduler> {}