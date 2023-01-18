export namespace Symbols {

    export const Factories = {
        User: Symbol.for("UserFactory"),
        City: Symbol.for("CityFactory"),
        Prayer: Symbol.for("PrayerFactory"),
        Mosque: Symbol.for("MosqueFactory"),
        Address: Symbol.for("AddressFactory"),
        District: Symbol.for("DistrictFactory"),
        TemplatePhoto: Symbol.for("TemplatePhotoFactory"),
        TelegramChannel: Symbol.for("TelegramChannelFactory")
    }

    export const Storages = {
        NamazTime: Symbol.for("NamazTimeStorage"),
        RegularSendingPrayerTimes: Symbol.for("RegularSendingPrayerTimesStorage")
    }

}