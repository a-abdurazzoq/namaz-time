import {SeedData, SeedDataModule} from "../../abstractions/seed-data";
import {inject, injectable, multiInject} from "inversify";
import {Symbols} from "../../../dependencies/symbols";

@injectable()
export class SeedDataImpl implements SeedData {
    constructor(
       @multiInject(Symbols.Infrastructures.SeedDataModules) private seedDataModules: SeedDataModule[]
    ) {}

    public async execute(): Promise<any> {
        for await (let seedDataModule of this.seedDataModules)
            await seedDataModule.insert()

        return
    }

}