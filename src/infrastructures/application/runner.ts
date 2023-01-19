import {Application, ApplicationRunner} from "../abstractions/application";
import {Container} from "../../dependencies/container";
import {Symbols} from "../../dependencies/symbols";

export class ApplicationRunnerImpl implements ApplicationRunner {
    constructor(
        private container: Container
    ) {}

    async run(): Promise<void> {
        let application = this.container.get<Application>(Symbols.Infrastructures.Application)
        await application.start()
        return
    }
}