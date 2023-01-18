import {ContainerModule} from "inversify";
import {Symbols} from "../symbols";
import {
    AddressFactory,
    CityFactory,
    DistrictFactory,
    MosqueFactory, PrayerFactory,
    TelegramChannelFactory,
    TemplatePhotoFactory, UserFactory
} from "../../domain/abstractions/factories";
import {
    AddressFactoryImpl,
    CityFactoryImpl,
    DistrictFactoryImpl,
    MosqueFactoryImpl,
    PrayerFactoryImpl,
    TelegramChannelFactoryImpl,
    TemplatePhotoFactoryImpl,
    UserFactoryImpl
} from "../../domain/factories";
import {SchedulerFactory} from "../../components/abstractions/schduler";
import {SchedulerFactoryImpl} from "../../components/schduler";
import {RegularSendingPrayerTimesStorage} from "../../components/abstractions/storage";
import {RegularSendingPrayerTimesStorageImpl} from "../../components/storage/regular-sending-prayer-times-storage";

export const regularSendingPrayerTimesModule = new ContainerModule(bind => {
    // Factories
    bind<TelegramChannelFactory>(Symbols.Factories.TelegramChannel).to(TelegramChannelFactoryImpl).inSingletonScope()
    bind<TemplatePhotoFactory>(Symbols.Factories.TemplatePhoto).to(TemplatePhotoFactoryImpl).inSingletonScope()
    bind<SchedulerFactory>(Symbols.Factories.TemplatePhoto).to(SchedulerFactoryImpl).inSingletonScope()
    bind<DistrictFactory>(Symbols.Factories.District).to(DistrictFactoryImpl).inSingletonScope()
    bind<AddressFactory>(Symbols.Factories.Address).to(AddressFactoryImpl).inSingletonScope()
    bind<PrayerFactory>(Symbols.Factories.Prayer).to(PrayerFactoryImpl).inSingletonScope()
    bind<MosqueFactory>(Symbols.Factories.Mosque).to(MosqueFactoryImpl).inSingletonScope()
    bind<UserFactory>(Symbols.Factories.User).to(UserFactoryImpl).inSingletonScope()
    bind<CityFactory>(Symbols.Factories.City).to(CityFactoryImpl).inSingletonScope()

    // Storages
    bind<RegularSendingPrayerTimesStorage>(Symbols.Storages.NamazTime).to(RegularSendingPrayerTimesStorageImpl).inSingletonScope()
})