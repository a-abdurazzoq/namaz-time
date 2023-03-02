import path from "path";
import * as fs from "fs";
import {inject, injectable} from "inversify";

import {SeedDataModule} from "../../../abstractions/db/seed-data";
import {IslamicMonthRepository} from "../../../../repositories/abstractions";
import {Symbols} from "../../../../dependencies/symbols";
import {Logger} from "../../../../components/abstractions/logger";

interface IslamicMonthProps {
    number: number;
    name: string;
}

@injectable()
export class IslamicMonthsSeedDataModule implements SeedDataModule {
    private jsonFileName: string = "islamic-months.json"

    constructor(
        @inject(Symbols.Repositories.IslamicMonth) private islamicMonthRepository: IslamicMonthRepository,
        @inject(Symbols.Infrastructures.Logger) private logger: Logger
    ) {
    }

    public async insert(): Promise<any> {
        let islamicMonths = this.getData()

        await this.islamicMonthRepository.deleteAll()

        for await (let islamicMonth of islamicMonths)
            await this.islamicMonthRepository.create(islamicMonth)

        await this.logger.print({result: "Islamic months успешно добавлен"})

        return
    }

    private getData(): IslamicMonthProps[] {
        let text = fs.readFileSync(path.join(__dirname, `../../../../../database-seed-json/${this.jsonFileName}`), {encoding: "utf-8"})
        let jsonToObjects: any[] = JSON.parse(text)

        return jsonToObjects.map<IslamicMonthProps>(obj => {
            if(!this.isIslamicMonth(obj))
                throw new Error("Object is not define as Islamic month")

            return {
                name: obj.name,
                number: obj.number
            }
        })
    }

    private isIslamicMonth(props: any): props is IslamicMonthProps {
        return "number" in props && "name" in props
    }
}