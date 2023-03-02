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
        User: Symbol.for("UserRepositories"),
        City: Symbol.for("CityRepositories"),
        Mosque: Symbol.for("MosqueRepositories"),
        Request: Symbol.for("RequestRepositories"),
        District: Symbol.for("DistrictRepositories"),
        IslamicMonth: Symbol.for("IslamicMonthRepositories"),
        PrayersInDay: Symbol.for("PrayersInDayRepositories"),
        TemplatePhoto: Symbol.for("TemplatePhotoRepositories"),
        IslamicCalendar: Symbol.for("IslamicCalendarRepositories"),
        TelegramChat: Symbol.for("TelegramChatRepositories"),
        PostForTelegram: Symbol.for("PostForTelegramRepositories"),
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
            GetToday: Symbol.for("GetPrayerTimesByNowDatePresenter")
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
        Storage: Symbol.for("Storage")
    }
}