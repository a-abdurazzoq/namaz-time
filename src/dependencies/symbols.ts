import {RequestFactory} from "../domain/abstractions/factories/request";

export namespace Symbols {

    export const Factories = {
        User: Symbol.for("UserFactory"),
        City: Symbol.for("CityFactory"),
        Mosque: Symbol.for("MosqueFactory"),
        Address: Symbol.for("AddressFactory"),
        Request: Symbol.for("RequestFactory"),
        District: Symbol.for("DistrictFactory"),
        PrayerTimes: Symbol.for("PrayerTimesFactory"),
        PrayersInDay: Symbol.for("PrayersInDayFactory"),
        IslamicMonth: Symbol.for("IslamicMonthFactory"),
        TemplatePhoto: Symbol.for("TemplatePhotoFactory"),
        IslamicCalendar: Symbol.for("IslamicCalendarFactory"),
        TelegramChat: Symbol.for("TelegramChatFactory"),
        PostForTelegram: Symbol.for("PostForTelegramFactory"),
        Scheduler: Symbol.for("SchedulerFactory")
    }

    export const Repositories = {
        User: Symbol.for("UserRepository"),
        City: Symbol.for("CityRepository"),
        Mosque: Symbol.for("MosqueRepository"),
        Request: Symbol.for("RequestRepository"),
        District: Symbol.for("DistrictRepository"),
        IslamicMonth: Symbol.for("IslamicMonthRepository"),
        PrayersInDay: Symbol.for("PrayersInDayRepository"),
        TemplatePhoto: Symbol.for("TemplatePhotoRepository"),
        IslamicCalendar: Symbol.for("IslamicCalendarRepository"),
        TelegramChat: Symbol.for("TelegramChatRepository"),
        PostForTelegram: Symbol.for("PostForTelegramRepository"),
    }

    export const Clients = {
        TelegramBot: Symbol.for("TelegramBotClient"),
        NamozVaqti: Symbol.for("NamozVaqtiClient"),
        Aladhan: Symbol.for("AladhanClient"),
    }

    export const UseCases = {
        PrayerTimes: {
            GetToday: Symbol.for("GetTodayPrayerTimesUseCase")
        },
        Request: {
            CreateForRegister: Symbol.for("CreateRequestForRegisterUseCase")
        },
        PostForTelegram: {
            Create: Symbol.for("CreatePostForTelegramUseCase")
        },
        GetAllExecuteTimeChatsForSending: Symbol.for("GetAllExecuteTimeChatsForSendingUseCase"),
        MassSendPrayerTimesToTelegramChats: Symbol.for("MassSendPrayerTimesToTelegramChatsUseCase"),
        SendPrayerTimesToTelegramChat: Symbol.for("SendPrayerTimesToTelegramChatUseCase"),
        UpdateIslamicCalendar: Symbol.for("UpdateIslamicCalendarUseCase"),
        UpdatePrayersPerMonth: Symbol.for("UpdatePrayersPerMonthUseCase")
    }

    export const Presenters = {
        PrayerTimes: {
            GetToday: Symbol.for("GetTodayPrayerTimesPresenter")
        },
        PostForTelegram: {
            Create: Symbol.for("CreatePostForTelegramPresenter")
        },
    }

    export const Services = {
        TemplatePhoto: Symbol.for("TemplatePhotoService"),
        HtmlTableToJson: Symbol.for("HtmlTableToJsonService")
    }

    export const Controllers = {
        Request: Symbol.for("RequestController"),
        PrayerTimes: Symbol.for("PrayerTimesController"),
        PostForTelegram: Symbol.for("PostForTelegramController"),
        Scheduler: Symbol.for("SchedulerController")
    }

    export const Configs = {
        Scheduler: Symbol.for("SchedulerConfig")
    }

    export const Infrastructures = {
        Application: Symbol.for("Application"),
        SeedData: Symbol.for("SeedData"),
        SeedDataModules: Symbol.for("SeedDataModules"),
        Logger: Symbol.for("Logger"),
        Transport: Symbol.for("Transport"),
        HttpDecorator: Symbol.for("HttpDecorator"),
        Routers: Symbol.for("HttpRouters"),
        Storage: Symbol.for("Storage")
    }
}