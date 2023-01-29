export namespace Symbols {

    export const Factories = {
        User: Symbol.for("UserFactory"),
        City: Symbol.for("CityFactory"),
        Prayer: Symbol.for("PrayerFactory"),
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
        Prayer: Symbol.for("PrayerRepositories"),
        Mosque: Symbol.for("MosqueRepositories"),
        District: Symbol.for("DistrictRepositories"),
        TemplatePhoto: Symbol.for("TemplatePhotoRepositories"),
        TelegramChannel: Symbol.for("TelegramChannelRepositories"),
        ChatForSendingPrayerTimes: Symbol.for("ChatForSendingPrayerTimesRepositories"),
    }

    export const Clients = {
        TelegramBot: Symbol.for("TelegramBotClient")
    }

    export const UseCases = {

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