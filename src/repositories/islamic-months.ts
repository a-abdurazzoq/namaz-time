import {IslamicMonthRepository} from "./abstractions/islamic-months";
import {IslamicMonth} from "../domain/entities";
import {IIslamicMonthModel, IslamicMonthModel} from "../models/islamic-months";
import {inject, injectable} from "inversify";
import {Symbols} from "../dependencies/symbols";
import {IslamicMonthFactory} from "../domain/abstractions/factories/islamic-month";

@injectable()
export class IslamicMonthRepositoryImpl implements IslamicMonthRepository {
    constructor(
       @inject(Symbols.Factories.IslamicMonth) private islamicMonthFactory: IslamicMonthFactory
    ) {}

    public async getByNumber(monthNumber: number): Promise<IslamicMonth> {
        const islamicMonth = await IslamicMonthModel.findOne({number: monthNumber})

        if (!islamicMonth)
            throw new Error("Islamic month not found by month number")

        return this.toEntity(islamicMonth)
    }

    private toEntity(islamicMonthModel: IIslamicMonthModel): IslamicMonth {
        return this.islamicMonthFactory.create({
            id: islamicMonthModel._id.toHexString(),
            number: islamicMonthModel.number,
            name: islamicMonthModel.name
        })
    }

}