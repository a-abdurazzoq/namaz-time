import {RequestFactory} from "../domain/abstractions/factories/request";

export namespace Symbols {

    export const Factories = {
        User: Symbol.for("UserFactory"),
        City: Symbol.for("CityFactory"),
        Token: Symbol.for("TokenFactory"),
        Mosque: Symbol.for("MosqueFactory"),
        Address: Symbol.for("AddressFactory"),
        Request: Symbol.for("RequestFactory"),
        District: Symbol.for("DistrictFactory"),
        PrayerTimes: Symbol.for("PrayerTimesFactory"),
        TelegramChat: Symbol.for("TelegramChatFactory"),
        PrayersInDay: Symbol.for("PrayersInDayFactory"),
        IslamicMonth: Symbol.for("IslamicMonthFactory"),
        TemplatePhoto: Symbol.for("TemplatePhotoFactory"),
        IslamicCalendar: Symbol.for("IslamicCalendarFactory"),
        PostForTelegram: Symbol.for("PostForTelegramFactory"),
        Scheduler: Symbol.for("SchedulerFactory")
    }

    export const Repositories = {
        User: Symbol.for("UserRepository"),
        City: Symbol.for("CityRepository"),
        Token: Symbol.for("TokenRepository"),
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
        Authorization: {
            Login: Symbol.for("LoginAuthorizationUseCase"),
            Registration: Symbol.for("RegistrationAuthorizationUseCase")
        },
        GetAllExecuteTimeChatsForSending: Symbol.for("GetAllExecuteTimeChatsForSendingUseCase"),
        MassSendPrayerTimesToTelegramChats: Symbol.for("MassSendPrayerTimesToTelegramChatsUseCase"),
        SendPrayerTimesToTelegramChat: Symbol.for("SendPrayerTimesToTelegramChatUseCase"),
        UpdateIslamicCalendar: Symbol.for("UpdateIslamicCalendarUseCase"),
        UpdatePrayersPerMonth: Symbol.for("UpdatePrayersPerMonthUseCase")
    }

    export const Presenters = {
        Authorization: {
            Login: Symbol.for("LoginAuthorizationPresenter"),
            Registration: Symbol.for("RegistrationAuthorizationPresenter"),
        },
        Request: {
            CreateForRegister: Symbol.for("CreateRequestForRegisterPresenter")
        },
        PrayerTimes: {
            GetToday: Symbol.for("GetTodayPrayerTimesPresenter")
        },
        PostForTelegram: {
            Create: Symbol.for("CreatePostForTelegramPresenter")
        },
    }

    export const Services = {
        Crypto: Symbol.for("CryptoService"),
        Token: Symbol.for("TokenService"),
        TemplatePhoto: Symbol.for("TemplatePhotoService"),
        HtmlTableToJson: Symbol.for("HtmlTableToJsonService")
    }

    export const Controllers = {
        Authorization: Symbol.for("AuthorizationController"),
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
        Http: {
            Middleware: Symbol.for("HttpMiddleware"),
            Decorator: Symbol.for("HttpDecorator"),
            Routers: Symbol.for("HttpRouters"),
        },
        Storage: Symbol.for("Storage")
    }
}