import {SeedDataModule} from "../../../abstractions/db/seed-data";
import {inject, injectable} from "inversify";
import {Symbols} from "../../../../dependencies/symbols";
import {Logger} from "../../../../components/abstractions/logger";
import {CityRepository} from "../../../../repositories/abstractions";
import fs from "fs";
import path from "path";

interface CityProps {
    _id: number;
    name: string;
}

@injectable()
export class CitiesSeedDataModule implements SeedDataModule {
    private jsonFileName: string = "cities.json"

    constructor(
        @inject(Symbols.Repositories.City) private cityRepository: CityRepository,
        @inject(Symbols.Infrastructures.Logger) private logger: Logger
    ) {
    }

    public async insert(): Promise<any> {
        let cities = this.getData()

        await this.cityRepository.deleteAll()

        for await (let city of cities)
            await this.cityRepository.create({
                id: city._id,
                name: city.name
            })

        await this.logger.print({result: "Cities успешно добавлен"})

        return
    }

    private getData(): CityProps[] {
        let text = fs.readFileSync(path.join(__dirname, `../../../../../database-seed-json/${this.jsonFileName}`), {encoding: "utf-8"})
        let jsonToObjects: any[] = JSON.parse(text)

        return jsonToObjects.map<CityProps>(obj => {
            if(!this.isCity(obj))
                throw new Error("Object is not define as Cities")

            return {
                _id: obj._id,
                name: obj.name
            }
        })
    }

    private isCity(props: any): props is CityProps {
        return "_id" in props && "name" in props
    }
}