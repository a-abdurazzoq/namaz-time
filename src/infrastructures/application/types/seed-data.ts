import {Application} from "../../abstractions/application";
import {SeedData} from "../../abstractions/db/seed-data";
import {inject, injectable} from "inversify";
import {Symbols} from "../../../dependencies/symbols";
import {Storage} from "../../abstractions";


@injectable()
export class SeedDataApplication implements Application {
    constructor(
        @inject(Symbols.Infrastructures.SeedData) private seedData: SeedData,
        @inject(Symbols.Infrastructures.Storage) private storage: Storage
    ) {}

    public async start(): Promise<void> {
        await this.storage.open()
        await this.seedData.execute()

        return
    }
    public async stop(): Promise<void> {
        await this.storage.open()

        return process.exit(19)
    }


}