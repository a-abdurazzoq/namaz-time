import {IslamicCalendar} from "../domain/entities";
import {InsertDays, IslamicCalendarRepository} from "./abstractions/islamic-calendar";
import {inject, injectable} from "inversify";
import {Symbols} from "../dependencies/symbols";
import {IslamicCalendarFactory} from "../domain/abstractions/factories/islamic-calendar";
import {IIslamicCalendarModel, IslamicCalendarModel} from "../models/islamic-calendar";
import {IslamicMonthRepository} from "./abstractions/islamic-months";

@injectable()
export class IslamicCalendarRepositoryImpl implements IslamicCalendarRepository {
    constructor(
       @inject(Symbols.Factories.IslamicCalendar) private islamicCalendarFactory: IslamicCalendarFactory,
       @inject(Symbols.Repositories.IslamicMonth) private islamicMonthRepository: IslamicMonthRepository
    ) {}
    public async getDayByGregorianTime(date: Date): Promise<IslamicCalendar> {
        const islamicDay = await IslamicCalendarModel.findOne({gregorian_time: {$eq: date}})

        if(!islamicDay)
            throw new Error("Islamic day not found by gregorian time")

        return this.toEntity(islamicDay)
    }

    public async getDayById(id: string): Promise<IslamicCalendar> {
        const islamicDay = await IslamicCalendarModel.findById(id)

        if(!islamicDay)
            throw new Error("Islamic day not found by id")

        return this.toEntity(islamicDay)
    }

    public async insertDays(params: InsertDays.Params): Promise<InsertDays.Response> {
        let IslamicDays = await IslamicCalendarModel.insertMany(params)

        return this.toEntities(IslamicDays)
    }

    private toEntities(islamicDays: IIslamicCalendarModel[]): Promise<IslamicCalendar[]> {
        let entities = islamicDays.map(islamicDay => this.toEntity(islamicDay))

        return Promise.all(entities)
    }

    private async toEntity(islamicCalendarModel: IIslamicCalendarModel): Promise<IslamicCalendar> {
        const month = await this.islamicMonthRepository.getByNumber(islamicCalendarModel.month_number)

        return this.islamicCalendarFactory.create({
            id: islamicCalendarModel._id.toHexString(),
            year: islamicCalendarModel.year,
            month: month,
            dayNumber: islamicCalendarModel.day_number,
            gregorianTime: islamicCalendarModel.gregorian_time,
            updateAt: islamicCalendarModel.update_at,
            createAt: islamicCalendarModel.create_at,
        })
    }
}