import {IslamicCalendar} from "../domain/entities";
import {GetDayByGregorianTimeAndIslamicDay,
    InsertDays,
    IslamicCalendarRepository,
    IslamicMonthRepository
} from "./abstractions";
import {inject, injectable} from "inversify";
import {Symbols} from "../dependencies/symbols";
import {IslamicCalendarFactory} from "../domain/abstractions/factories";
import {IIslamicCalendarModel, IslamicCalendarModel} from "../models/islamic-calendar";
import {Types} from "mongoose";

@injectable()
export class IslamicCalendarRepositoryImpl implements IslamicCalendarRepository {
    constructor(
        @inject(Symbols.Factories.IslamicCalendar) private islamicCalendarFactory: IslamicCalendarFactory,
        @inject(Symbols.Repositories.IslamicMonth) private islamicMonthRepository: IslamicMonthRepository
    ) {
    }

    public async getDayByGregorianTimeAndIslamicDay(params: GetDayByGregorianTimeAndIslamicDay.Params): Promise<IslamicCalendar> {
        const islamicDay = await IslamicCalendarModel.findOne({gregorian_date: {$eq: params.gregorianDate}, day_number: params.islamicDay})

        if(!islamicDay)
            throw new Error("Islamic day not found by gregorian time and day number")

        return this.toEntity(islamicDay)
    }

    public async getDayByGregorianTime(date: Date): Promise<IslamicCalendar> {
        const islamicDay = await IslamicCalendarModel.findOne({gregorian_date: {$eq: date}})

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

    public async getDaysIdPerMonthByDate(date: Date): Promise<Types.ObjectId[]> {
        let minDayAndMaxDayInMonth = this.getMinDayAndMaxDayInMonth(date)

        const daysPerMonth = await IslamicCalendarModel.find({
            gregorian_date: {
                $gte: minDayAndMaxDayInMonth.minDay,
                $lte: minDayAndMaxDayInMonth.maxDay
            }
        })

        return daysPerMonth.map(day => day._id)
    }

    public async insertDays(params: InsertDays.Params[]): Promise<InsertDays.Response> {
        let days = params.map(day => {
            return {
                year: day.year,
                day_number: day.dayNumber,
                month_number: day.monthNumber,
                gregorian_date: day.gregorianDate
            }
        })

        let IslamicDays = await IslamicCalendarModel.insertMany(days)

        return this.toEntities(IslamicDays)
    }

    public async deleteAll(): Promise<void> {
        await IslamicCalendarModel.deleteMany({});

        return
    }

    public async hasMonth(date: Date): Promise<boolean> {
        let minDayAndMaxDayInMonth = this.getMinDayAndMaxDayInMonth(date)

        const countDaysPerMonth = await IslamicCalendarModel.count({
            gregorian_date: {
                $gte: minDayAndMaxDayInMonth.minDay,
                $lte: minDayAndMaxDayInMonth.maxDay
            }
        })

        return countDaysPerMonth === minDayAndMaxDayInMonth.maxDay.getDate()
    }

    private getMinDayAndMaxDayInMonth(date: Date): {minDay: Date, maxDay: Date} {
        let maxDayInMonth = new Date(date)
        maxDayInMonth.setHours(0,0,0,0)
        maxDayInMonth.setMonth(maxDayInMonth.getMonth()+1)
        maxDayInMonth.setDate(0)

        let minDayInMonth = new Date(maxDayInMonth)
        minDayInMonth.setDate(1)

        return {
            maxDay: maxDayInMonth,
            minDay: minDayInMonth
        }
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
            gregorianTime: islamicCalendarModel.gregorian_date,
            updateAt: islamicCalendarModel.update_at,
            createAt: islamicCalendarModel.create_at,
        })
    }
}