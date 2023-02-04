import {ContainerModule} from "inversify";
import {Symbols} from "../symbols";
import {
    ChatForSendingPrayerTimesFactory,
    TelegramChannelFactory,
    TemplatePhotoFactory,
    DistrictFactory,
    AddressFactory,
    MosqueFactory,
    PrayersInDayFactory,
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
    PrayersInDayFactoryImpl,
    CityFactoryImpl,
    UserFactoryImpl
} from "../../domain/factories";
import {Application} from "../../infrastructures/abstractions/application";
import {APIApplicationImpl} from "../../infrastructures/application";
import {Logger} from "../../components/abstractions/logger";
import {ConsoleLogger} from "../../components/logger";
import {
    ChatForSendingPrayerTimesRepository,
    CityRepository,
    DistrictRepository,
    MosqueRepository,
    PrayersInDayRepository, TelegramChannelRepository, TemplatePhotoRepository,
    UserRepository
} from "../../repositories/abstractions";
import {CityRepositoryImpl} from "../../repositories/city-repostiory";
import {
    ChatForSendingPrayerTimesRepositoryImpl,
    MosqueRepositoryImpl,
    PrayersInDayRepositoryImpl, TelegramChannelRepositoryImpl,
    TemplatePhotoRepositoryImpl,
    UserRepositoryImpl
} from "../../repositories";
import {DistrictRepositoryImpl} from "../../repositories/district-repostiory";
import {Storage} from "../../infrastructures/abstractions";
import {BaseMongoStorageImpl} from "../../infrastructures/db";

export const namazTimeModule = new ContainerModule(bind => {
    // Application
    bind<Application>(Symbols.Infrastructures.Application).to(APIApplicationImpl).inSingletonScope()

    // Storages
    bind<Storage>(Symbols.Infrastructures.Storage).to(BaseMongoStorageImpl).inSingletonScope()

    // Loggers
    bind<Logger>(Symbols.Infrastructures.Logger).to(ConsoleLogger).inSingletonScope()

    // Factories
    bind<CityFactory>(Symbols.Factories.City).to(CityFactoryImpl).inSingletonScope()
    bind<UserFactory>(Symbols.Factories.User).to(UserFactoryImpl).inSingletonScope()
    bind<MosqueFactory>(Symbols.Factories.Mosque).to(MosqueFactoryImpl).inSingletonScope()
    bind<PrayersInDayFactory>(Symbols.Factories.PrayersInDay).to(PrayersInDayFactoryImpl).inSingletonScope()
    bind<AddressFactory>(Symbols.Factories.Address).to(AddressFactoryImpl).inSingletonScope()
    bind<DistrictFactory>(Symbols.Factories.District).to(DistrictFactoryImpl).inSingletonScope()
    bind<TemplatePhotoFactory>(Symbols.Factories.TemplatePhoto).to(TemplatePhotoFactoryImpl).inSingletonScope()
    bind<TelegramChannelFactory>(Symbols.Factories.TelegramChannel).to(TelegramChannelFactoryImpl).inSingletonScope()
    bind<ChatForSendingPrayerTimesFactory>(Symbols.Factories.ChatForSendingPrayerTimes).to(ChatForSendingPrayerTimesFactoryImpl).inSingletonScope()

    // Repositories
    bind<CityRepository>(Symbols.Repositories.City).to(CityRepositoryImpl).inSingletonScope()
    bind<UserRepository>(Symbols.Repositories.User).to(UserRepositoryImpl).inSingletonScope()
    bind<MosqueRepository>(Symbols.Repositories.Mosque).to(MosqueRepositoryImpl).inSingletonScope()
    bind<PrayersInDayRepository>(Symbols.Repositories.PrayersInDay).to(PrayersInDayRepositoryImpl).inSingletonScope()
    bind<DistrictRepository>(Symbols.Repositories.District).to(DistrictRepositoryImpl).inSingletonScope()
    bind<TemplatePhotoRepository>(Symbols.Repositories.TemplatePhoto).to(TemplatePhotoRepositoryImpl).inSingletonScope()
    bind<TelegramChannelRepository>(Symbols.Repositories.TelegramChannel).to(TelegramChannelRepositoryImpl).inSingletonScope()
    bind<ChatForSendingPrayerTimesRepository>(Symbols.Repositories.ChatForSendingPrayerTimes).to(ChatForSendingPrayerTimesRepositoryImpl).inSingletonScope()
})