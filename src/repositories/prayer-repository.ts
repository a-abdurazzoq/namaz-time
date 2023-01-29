import {PrayerRepository} from "./abstractions";
import {inject, injectable} from "inversify";
import {Symbols} from "../dependencies/symbols";
import {Prayer} from "../domain/entities";
import {PrayerModel, IPrayerModel} from "../models";
import {PrayerFactory} from "../domain/abstractions/factories";

@injectable()
export class PrayerRepositoryImpl implements PrayerRepository {
    constructor(
        @inject(Symbols.Factories.Prayer) private prayerFactory: PrayerFactory
    ) {}

    public async getById(id: string): Promise<Prayer> {
        let getPrayer = await PrayerModel.findById<IPrayerModel>(id)

        if(!getPrayer)
            throw new Error("Prayer not found by id")

        return this.toEntity(getPrayer)
    }

    private toEntity(prayerModel: IPrayerModel): Prayer {
        return this.prayerFactory.create({
            id: prayerModel._id.toHexString(),
            name: prayerModel.name,
            time: prayerModel.time,
            updateAt: prayerModel.update_at,
            createAt: prayerModel.create_at
        })
    }

}