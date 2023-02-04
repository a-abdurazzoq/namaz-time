export namespace Symbols {

    export const Factories = {
        User: Symbol.for("UserFactory"),
        City: Symbol.for("CityFactory"),
        PrayersInDay: Symbol.for("PrayersInDayFactory"),
        PrayerTimes: Symbol.for("PrayerTimesFactory"),
        IslamicCalendar: Symbol.for("IslamicCalendarFactory"),
        IslamicMonth: Symbol.for("IslamicMonthFactory"),
        Mosque: Symbol.for("MosqueFactory"),
        Address: Symbol.for("AddressFactory"),
        District: Symbol.for("DistrictFactory"),
        TemplatePhoto: Symbol.for("TemplatePhotoFactory"),
        TelegramChannel: Symbol.for("TelegramChannelFactory"),
        ChatForSendingPrayerTimes: Symbol.for("ChatForSendingPrayerTimesFactory"),
        Scheduler: Symbol.for("SchedulerFactory")
    }

    export const Repositories = {
        User: Symbol.for("UserRepositories"),
        City: Symbol.for("CityRepositories"),
        PrayersInDay: Symbol.for("PrayersInDayRepositories"),
        Mosque: Symbol.for("MosqueRepositories"),
        IslamicCalendar: Symbol.for("IslamicCalendarRepositories"),
        IslamicMonth: Symbol.for("IslamicMonthRepositories"),
        District: Symbol.for("DistrictRepositories"),
        TemplatePhoto: Symbol.for("TemplatePhotoRepositories"),
        TelegramChannel: Symbol.for("TelegramChannelRepositories"),
        ChatForSendingPrayerTimes: Symbol.for("ChatForSendingPrayerTimesRepositories"),
    }

    export const Clients = {
        TelegramBot: Symbol.for("TelegramBotClient")
    }

    export const UseCases = {
        GetAllExecuteTimeChatsForSending: Symbol.for("GetAllExecuteTimeChatsForSendingUseCase"),
        MassSendPrayerTimesToTelegramChannels: Symbol.for("MassSendPrayerTimesToTelegramChannelsUseCase"),
        SendPrayerTimesToTelegramChannel: Symbol.for("SendPrayerTimesToTelegramChannelUseCase")
    }

    export const Services = {
        TemplatePhoto: Symbol.for("TemplatePhotoService")
    }

    export const Controllers = {
        Scheduler: Symbol.for("SchedulerController")
    }

    export const Configs = {
        Scheduler: Symbol.for("SchedulerConfig")
    }

    export const Infrastructures = {
        Application: Symbol.for("Application"),
        Logger: Symbol.for("Logger"),
        Storage: Symbol.for("Storage")
    }
}