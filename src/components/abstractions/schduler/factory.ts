import {Factory} from "../../../domain/abstractions/factories/factory";
import {Scheduler} from "../../schduler";
import {Config} from "./config";
import {Controller} from "../../../controllers/abstractions";

export interface SchedulerDto {
    config: Config;
    controller: Controller;
    logger: Logger;
}

export interface SchedulerFactory extends Factory<SchedulerDto, Scheduler> {}