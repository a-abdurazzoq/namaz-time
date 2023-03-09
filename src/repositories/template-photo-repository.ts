import {inject, injectable} from "inversify";

import {
    CreateTemplatePhotoRepositoryParams,
    GeneratePhotoByPostForTelegramParams,
    PrayersInDayRepository,
    TemplatePhotoRepository,
    IslamicCalendarRepository,
    TelegramChatRepository
} from "./abstractions";
import {TemplatePhotoFactory} from "../domain/abstractions/factories";
import {Symbols} from "../dependencies/symbols";
import {TemplatePhoto} from "../domain/entities";
import {TemplatePhotoModel, ITemplatePhotoModel} from "../models";
import {TemplatePhotoService} from "../services/abstractions/template-photo-service";

@injectable()
export class TemplatePhotoRepositoryImpl implements TemplatePhotoRepository {
    constructor(
        @inject(Symbols.Factories.TemplatePhoto) private templatePhotoFactory: TemplatePhotoFactory,
        @inject(Symbols.Services.TemplatePhoto) private templatePhotoService: TemplatePhotoService,
        @inject(Symbols.Repositories.TelegramChat) private telegramChatRepository: TelegramChatRepository,
        @inject(Symbols.Repositories.IslamicCalendar) private islamicCalendarRepository: IslamicCalendarRepository,
        @inject(Symbols.Repositories.PrayersInDay) private prayersInDayRepository: PrayersInDayRepository
    ) {}

    public async create(params: CreateTemplatePhotoRepositoryParams): Promise<TemplatePhoto> {
        let fileName = await this.templatePhotoService.createPhotoTemplateUsingBase64({
            base64: params.htmlTemplateFileBase64,
            additionalFileName: params.telegramChat.getName()
        })

        const createdTemplatePhoto = new TemplatePhotoModel({
            file_name: fileName,
            telegram_chat_id: params.telegramChat.getId()
        })

        await createdTemplatePhoto.save()

        return this.toEntity(createdTemplatePhoto)
    }

    public async getById(id: string): Promise<TemplatePhoto> {
        const getTemplatePhoto = await TemplatePhotoModel.findById(id)

        if(!getTemplatePhoto)
            throw new Error("Template photo not found by id")

        return this.toEntity(getTemplatePhoto)
    }

    public async generatePhotoByPostForTelegram(params: GeneratePhotoByPostForTelegramParams): Promise<Buffer> {
        const islamicCalendar = await this.islamicCalendarRepository.getDayByGregorianTime(params.necessaryDate)
        const prayerInDay = await this.prayersInDayRepository.getIslamicCalendarId(islamicCalendar.getId())

        return this.templatePhotoService.photoGeneration({
            htmlFileName: params.PostForTelegram.getTemplatePhoto().getFileName(),
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
        let telegramChat = await this.telegramChatRepository.getById(templatePhotoModel.telegram_chat_id.toHexString())

        return this.templatePhotoFactory.create({
            id: templatePhotoModel._id.toHexString(),
            fileName: templatePhotoModel.file_name,
            telegramChat: telegramChat,
            createAt: templatePhotoModel.create_at,
            updateAt: templatePhotoModel.update_at
        })
    }
}