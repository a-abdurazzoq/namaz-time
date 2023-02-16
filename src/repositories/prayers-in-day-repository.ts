import {InsertPrayerTimesParams, PrayersInDayRepository} from "./abstractions";
import {inject, injectable} from "inversify";
import {Symbols} from "../dependencies/symbols";
import {IslamicCalendar, PrayersInDay} from "../domain/entities";
import {IPrayerTimesModel, PrayerTimesModel} from "../models";
import {PrayersInDayFactory, PrayerTimesFactory} from "../domain/abstractions/factories";
import {IslamicCalendarRepository} from "./abstractions";
import {Types} from "mongoose";

@injectable()
export class PrayersInDayRepositoryImpl implements PrayersInDayRepository {
    constructor(
        @inject(Symbols.Factories.PrayersInDay) private prayersInDayFactory: PrayersInDayFactory,
        @inject(Symbols.Repositories.IslamicCalendar) private islamicCalendarRepository: IslamicCalendarRepository,
        @inject(Symbols.Factories.PrayerTimes) private prayerTimesFactory: PrayerTimesFactory
    ) {}

    public async getById(id: string): Promise<PrayersInDay> {
        let getPrayer = await PrayerTimesModel.findById(id)
        
        if(!getPrayer)
            throw new Error("Prayers in day not found by id")

        return this.toEntity(getPrayer)
    }

    public async getIslamicCalendarId(islamicCalendarId: string): Promise<PrayersInDay> {
        let getPrayer = await PrayerTimesModel.findOne({islamic_calendar_id: new Types.ObjectId(islamicCalendarId)})

        if(!getPrayer)
            throw new Error("Prayers in day not found by islamic calendar id")

        return this.toEntity(getPrayer)
    }

    public async getPrayerTimesByDate(date: Date): Promise<PrayersInDay> {
        let getIslamicCalendarByDate = await this.islamicCalendarRepository.getDayByGregorianTime(date)

        return this.getIslamicCalendarId(getIslamicCalendarByDate.getId())
    }

    public async insertPrayersPerMonth(prayersPerMonth: InsertPrayerTimesParams[]): Promise<PrayersInDay[]> {
        let insertPrayersPerMonth: PrayersInDay[] = []

        for (const prayerTimes of prayersPerMonth) {
            insertPrayersPerMonth.push(await this.insertPrayerTimes(prayerTimes))
        }

        return insertPrayersPerMonth
    }

    public async insertPrayerTimes(prayerTimes: InsertPrayerTimesParams): Promise<PrayersInDay> {
        const islamicDay = await this.islamicCalendarRepository.getDayByGregorianTimeAndIslamicDay({islamicDay: prayerTimes.islamicDay, gregorianDate: prayerTimes.gregorianDate})
        const hasPrayerTimes =  await this.hasPrayerTimes(islamicDay)

        if(hasPrayerTimes)
            throw new Error("This prayers in day exist in collection")

        const prayersInDay = new PrayerTimesModel({
            islamic_calendar_id: islamicDay.getId(),
            prayer_times: {
                fajr: prayerTimes.fajr,
                shurooq: prayerTimes.shurooq,
                dhuhr: prayerTimes.dhuhr,
                asr: prayerTimes.asr,
                maghrib: prayerTimes.maghrib,
                isha: prayerTimes.isha
            }
        })

        await prayersInDay.save()

        return this.toEntity(prayersInDay)
    }

    public async deleteAll(): Promise<void> {
        await PrayerTimesModel.deleteMany({})

        return
    }

    private async hasPrayerTimes(islamicDay: IslamicCalendar): Promise<boolean> {
        let prayerTimes = await PrayerTimesModel.findOne({islamic_calendar_id: new Types.ObjectId(islamicDay.getId())})

        return !!prayerTimes
    }

    public async hasPrayerTimesPerMonth(dateMonth: Date): Promise<boolean> {
        const idDaysPerMonth = await this.islamicCalendarRepository.getDaysIdPerMonthByDate(dateMonth)

        if(!idDaysPerMonth.length)
            return false

        const countDaysPerMonth = await PrayerTimesModel.count({islamic_calendar_id: {$in: idDaysPerMonth}})

        return countDaysPerMonth >= idDaysPerMonth.length
    }


    private async toEntity(prayerModel: IPrayerTimesModel): Promise<PrayersInDay> {
        let prayerTimes = this.prayerTimesFactory.create(prayerModel.prayer_times)
        let islamicCalendar = await this.islamicCalendarRepository.getDayById(prayerModel.islamic_calendar_id.toHexString())

        return this.prayersInDayFactory.create({
            id: prayerModel._id.toHexString(),
            islamicCalendar: islamicCalendar,
            prayerTimes: prayerTimes,
            updateAt: prayerModel.update_at,
            createAt: prayerModel.create_at
        })
    }
}