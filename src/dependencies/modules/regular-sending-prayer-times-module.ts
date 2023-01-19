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
import {SchedulerConfig, SchedulerFactory} from "../../components/abstractions/schduler";
import {SchedulerFactoryImpl} from "../../components/schduler";
import {RegularSendingPrayerTimesStorage} from "../../components/abstractions/storage";
import {RegularSendingPrayerTimesStorageImpl} from "../../components/storage/regular-sending-prayer-times-storage";
import {Application} from "../../infrastructures/abstractions/application";
import {SchedulerApplicationImpl} from "../../infrastructures/application";
import {Logger} from "../../components/abstractions/logger";
import {ConsoleLogger} from "../../components/logger";
import {ConfigScheduler} from "../../components/schduler/config";
import {Controller} from "../../controllers/abstractions";
import {SendingPrayerTimesController} from "../../controllers";

export const regularSendingPrayerTimesModule = new ContainerModule(bind => {
    // Application
    bind<Application>(Symbols.Infrastructures.Application).to(SchedulerApplicationImpl).inSingletonScope()

    // Storages
    bind<RegularSendingPrayerTimesStorage>(Symbols.Infrastructures.Storage).to(RegularSendingPrayerTimesStorageImpl).inSingletonScope()

    // Loggers
    bind<Logger>(Symbols.Infrastructures.Logger).to(ConsoleLogger).inSingletonScope()

    // Configs
    bind<SchedulerConfig>(Symbols.Configs.Scheduler).to(ConfigScheduler).inSingletonScope()

    // Controllers
    bind<Controller>(Symbols.Controllers.Scheduler).to(SendingPrayerTimesController).inSingletonScope()

    // Factories
    bind<TelegramChannelFactory>(Symbols.Factories.TelegramChannel).to(TelegramChannelFactoryImpl).inSingletonScope()
    bind<TemplatePhotoFactory>(Symbols.Factories.TemplatePhoto).to(TemplatePhotoFactoryImpl).inSingletonScope()
    bind<SchedulerFactory>(Symbols.Factories.Scheduler).to(SchedulerFactoryImpl).inSingletonScope()
    bind<DistrictFactory>(Symbols.Factories.District).to(DistrictFactoryImpl).inSingletonScope()
    bind<AddressFactory>(Symbols.Factories.Address).to(AddressFactoryImpl).inSingletonScope()
    bind<PrayerFactory>(Symbols.Factories.Prayer).to(PrayerFactoryImpl).inSingletonScope()
    bind<MosqueFactory>(Symbols.Factories.Mosque).to(MosqueFactoryImpl).inSingletonScope()
    bind<UserFactory>(Symbols.Factories.User).to(UserFactoryImpl).inSingletonScope()
    bind<CityFactory>(Symbols.Factories.City).to(CityFactoryImpl).inSingletonScope()
})