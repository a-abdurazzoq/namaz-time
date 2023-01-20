import {ContainerModule} from "inversify";
import {Symbols} from "../symbols";
import {
    ChatForSendingPrayerTimesFactory,
    TelegramChannelFactory,
    TemplatePhotoFactory,
    DistrictFactory,
    AddressFactory,
    MosqueFactory,
    PrayerFactory,
    CityFactory,
    UserFactory
} from "../../domain/abstractions/factories";
import {
    ChatForSendingPrayerTimesFactoryImpl,
    TelegramChannelFactoryImpl,
    TemplatePhotoFactoryImpl,
    DistrictFactoryImpl,
    AddressFactoryImpl,
    MosqueFactoryImpl,
    PrayerFactoryImpl,
    CityFactoryImpl,
    UserFactoryImpl
} from "../../domain/factories";
import {SchedulerConfig, SchedulerFactory} from "../../components/abstractions/schduler";
import {SchedulerFactoryImpl} from "../../components/schduler";
import {Application} from "../../infrastructures/abstractions/application";
import {SchedulerApplicationImpl} from "../../infrastructures/application";
import {Logger} from "../../components/abstractions/logger";
import {ConsoleLogger} from "../../components/logger";
import {ConfigScheduler} from "../../components/schduler/config";
import {Controller} from "../../controllers/abstractions";
import {SendingPrayerTimesController} from "../../controllers";
import {
    ChatForSendingPrayerTimesRepository,
    CityRepository,
    DistrictRepository,
    MosqueRepository,
    PrayerRepository, TelegramChannelRepository, TemplatePhotoRepository,
    UserRepository
} from "../../repositories/abstractions";
import {CityRepositoryImpl} from "../../repositories/city-repostiory";
import {
    ChatForSendingPrayerTimesRepositoryImpl,
    MosqueRepositoryImpl,
    PrayerRepositoryImpl, TelegramChannelRepositoryImpl,
    TemplatePhotoRepositoryImpl,
    UserRepositoryImpl
} from "../../repositories";
import {DistrictRepositoryImpl} from "../../repositories/district-repostiory";
import {Storage} from "../../infrastructures/abstractions";
import {BaseMongoStorageImpl} from "../../infrastructures/db";

export const regularSendingPrayerTimesModule = new ContainerModule(bind => {
    // Application
    bind<Application>(Symbols.Infrastructures.Application).to(SchedulerApplicationImpl).inSingletonScope()

    // Storages
    bind<Storage>(Symbols.Infrastructures.Storage).to(BaseMongoStorageImpl).inSingletonScope()

    // Loggers
    bind<Logger>(Symbols.Infrastructures.Logger).to(ConsoleLogger).inSingletonScope()

    // Configs
    bind<SchedulerConfig>(Symbols.Configs.Scheduler).to(ConfigScheduler).inSingletonScope()

    // Controllers
    bind<Controller>(Symbols.Controllers.Scheduler).to(SendingPrayerTimesController).inSingletonScope()

    // Factories
    bind<ChatForSendingPrayerTimesFactory>(Symbols.Factories.ChatForSendingPrayerTimes).to(ChatForSendingPrayerTimesFactoryImpl).inSingletonScope()
    bind<TelegramChannelFactory>(Symbols.Factories.TelegramChannel).to(TelegramChannelFactoryImpl).inSingletonScope()
    bind<TemplatePhotoFactory>(Symbols.Factories.TemplatePhoto).to(TemplatePhotoFactoryImpl).inSingletonScope()
    bind<SchedulerFactory>(Symbols.Factories.Scheduler).to(SchedulerFactoryImpl).inSingletonScope()
    bind<DistrictFactory>(Symbols.Factories.District).to(DistrictFactoryImpl).inSingletonScope()
    bind<AddressFactory>(Symbols.Factories.Address).to(AddressFactoryImpl).inSingletonScope()
    bind<PrayerFactory>(Symbols.Factories.Prayer).to(PrayerFactoryImpl).inSingletonScope()
    bind<MosqueFactory>(Symbols.Factories.Mosque).to(MosqueFactoryImpl).inSingletonScope()
    bind<UserFactory>(Symbols.Factories.User).to(UserFactoryImpl).inSingletonScope()
    bind<CityFactory>(Symbols.Factories.City).to(CityFactoryImpl).inSingletonScope()

    // Repositories
    bind<ChatForSendingPrayerTimesRepository>(Symbols.Repositories.ChatForSendingPrayerTimes).to(ChatForSendingPrayerTimesRepositoryImpl).inSingletonScope()
    bind<TelegramChannelRepository>(Symbols.Repositories.TelegramChannel).to(TelegramChannelRepositoryImpl).inSingletonScope()
    bind<TemplatePhotoRepository>(Symbols.Repositories.TemplatePhoto).to(TemplatePhotoRepositoryImpl).inSingletonScope()
    bind<DistrictRepository>(Symbols.Repositories.District).to(DistrictRepositoryImpl).inSingletonScope()
    bind<PrayerRepository>(Symbols.Repositories.Prayer).to(PrayerRepositoryImpl).inSingletonScope()
    bind<MosqueRepository>(Symbols.Repositories.Mosque).to(MosqueRepositoryImpl).inSingletonScope()
    bind<UserRepository>(Symbols.Repositories.User).to(UserRepositoryImpl).inSingletonScope()
    bind<CityRepository>(Symbols.Repositories.City).to(CityRepositoryImpl).inSingletonScope()
})