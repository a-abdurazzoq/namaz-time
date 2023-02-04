import {PrayersInDayRepository} from "./abstractions";
import {inject, injectable} from "inversify";
import {Symbols} from "../dependencies/symbols";
import {PrayersInDay} from "../domain/entities";
import {IPrayerTimesModel, PrayerTimesModel} from "../models";
import {PrayersInDayFactory, PrayerTimesFactory} from "../domain/abstractions/factories";
import {IslamicCalendarRepository} from "./abstractions/islamic-calendar";

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
        let getPrayer = await PrayerTimesModel.findById(islamicCalendarId)

        if(!getPrayer)
            throw new Error("Prayers in day not found by islamic calendar id")

        return this.toEntity(getPrayer)
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