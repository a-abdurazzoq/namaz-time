import {inject, injectable} from "inversify";
import {Symbols} from "../../../../dependencies/symbols";
import {Logger} from "../../../../components/abstractions/logger";
import {DistrictRepository} from "../../../../repositories/abstractions";
import {SeedDataModule} from "../../../abstractions";
import path from "path";
import fs from "fs";

interface DistrictProps {
    _id: number;
    city_id: number;
    name: string;
}

@injectable()
export class DistrictsSeedDataModule implements SeedDataModule {
    private jsonFileName: string = "districts.json"

    constructor(
        @inject(Symbols.Repositories.District) private districtRepository: DistrictRepository,
        @inject(Symbols.Infrastructures.Logger) private logger: Logger
    ) {
    }

    public async insert(): Promise<any> {
        let cities = this.getData()

        await this.districtRepository.deleteAll()

        for await (let city of cities)
            await this.districtRepository.create({
                id: city._id,
                city_id: city.city_id,
                name: city.name
            })

        await this.logger.print({result: "Districts успешно добавлен"})

        return
    }

    private getData(): DistrictProps[] {
        let text = fs.readFileSync(path.join(__dirname, `../../../../../database-seed-json/${this.jsonFileName}`), {encoding: "utf-8"})
        let jsonToObjects: any[] = JSON.parse(text)

        return jsonToObjects.map<DistrictProps>(obj => {
            if(!this.isCity(obj))
                throw new Error("Object is not define as Districts")

            return {
                _id: obj._id,
                city_id: obj.city_id,
                name: obj.name
            }
        })
    }

    private isCity(props: any): props is DistrictProps {
        return "_id" in props && "city_id" in props && "name" in props
    }
}