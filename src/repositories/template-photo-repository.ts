import {inject, injectable} from "inversify";

import {
    GeneratePhotoByChatForSendingPrayerTimesParams,
    PrayersInDayRepository,
    TemplatePhotoRepository,
    UserRepository
} from "./abstractions";
import {TemplatePhotoFactory} from "../domain/abstractions/factories";
import {Symbols} from "../dependencies/symbols";
import {TemplatePhoto} from "../domain/entities";
import {TemplatePhotoModel, ITemplatePhotoModel} from "../models";
import {TemplatePhotoService} from "../services/abstractions/template-photo-service";
import {IslamicCalendarRepository} from "./abstractions/islamic-calendar";

@injectable()
export class TemplatePhotoRepositoryImpl implements TemplatePhotoRepository {
    constructor(
        @inject(Symbols.Factories.TemplatePhoto) private templatePhotoFactory: TemplatePhotoFactory,
        @inject(Symbols.Services.TemplatePhoto) private templatePhotoService: TemplatePhotoService,
        @inject(Symbols.Repositories.User) private userRepository: UserRepository,
        @inject(Symbols.Repositories.IslamicCalendar) private islamicCalendarRepository: IslamicCalendarRepository,
        @inject(Symbols.Repositories.PrayersInDay) private prayersInDayRepository: PrayersInDayRepository
    ) {}

    public async getById(id: string): Promise<TemplatePhoto> {
        const getTemplatePhoto = await TemplatePhotoModel.findById<ITemplatePhotoModel>(id)

        if(!getTemplatePhoto)
            throw new Error("Template photo not found by id")

        return this.toEntity(getTemplatePhoto)
    }

    public async generatePhotoByChatForSendingPrayerTimes(params: GeneratePhotoByChatForSendingPrayerTimesParams): Promise<Buffer> {
        const islamicCalendar = await this.islamicCalendarRepository.getDayByGregorianTime(params.necessaryDate)
        const prayerInDay = await this.prayersInDayRepository.getIslamicCalendarId(islamicCalendar.getId())

        return this.templatePhotoService.photoGeneration({
            htmlFileName: params.chatForSendingPrayerTimes.getTemplatePhoto().getFileName(),
            fajr: prayerInDay.getPrayerTimes().getFajr(),
            shurooq: prayerInDay.getPrayerTimes().getShurooq(),
            dhuhr: prayerInDay.getPrayerTimes().getDhuhr(),
            asr: prayerInDay.getPrayerTimes().getAsr(),
            maghrib: prayerInDay.getPrayerTimes().getMaghrib(),
            isha: prayerInDay.getPrayerTimes().getIsha(),
            gregorianFullDate: prayerInDay.getIslamicCalendar().getGregorianDateAsText(),
            islamicFullDate: prayerInDay.getIslamicCalendar().getIslamicDateAsText(),
        })
    }

    private async toEntity(templatePhotoModel: ITemplatePhotoModel): Promise<TemplatePhoto> {
        let user = await this.userRepository.getById(templatePhotoModel.user_id.toHexString())

        return this.templatePhotoFactory.create({
            id: templatePhotoModel._id.toHexString(),
            fileName: templatePhotoModel.file_name,
            user: user,
            createAt: templatePhotoModel.create_at,
            updateAt: templatePhotoModel.update_at
        })
    }

}