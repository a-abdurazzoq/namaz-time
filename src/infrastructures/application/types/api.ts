import {Application} from "../../abstractions/application";
import {inject, injectable} from "inversify";
import {Symbols} from "../../../dependencies/symbols";
import {Logger} from "../../../components/abstractions/logger";
import {Storage, Transport} from "../../abstractions";

@injectable()
export class APIApplicationImpl implements Application {
    constructor(
        @inject(Symbols.Infrastructures.Logger) private readonly logger: Logger,
        @inject(Symbols.Infrastructures.Storage) private readonly storage: Storage,
        @inject(Symbols.Infrastructures.Transport) private readonly transport: Transport
    ) {}

    public async start(): Promise<void> {
        await this.storage.open()
        await this.transport.start()
        return
    }

    public async stop(): Promise<void> {
        await this.storage.close()
        await this.transport.stop()
        return
    }
}