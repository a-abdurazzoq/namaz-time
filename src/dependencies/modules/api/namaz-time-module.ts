import {ContainerModule} from "inversify";
import {Symbols} from "../../symbols";
import {
    PostForTelegramFactory,
    TelegramChatFactory,
    TemplatePhotoFactory,
    DistrictFactory,
    AddressFactory,
    PrayersInDayFactory,
    CityFactory,
    UserFactory
} from "../../../domain/abstractions/factories";
import {
    PostForTelegramFactoryImpl,
    TelegramChatFactoryImpl,
    TemplatePhotoFactoryImpl,
    DistrictFactoryImpl,
    AddressFactoryImpl,
    PrayersInDayFactoryImpl,
    CityFactoryImpl,
    UserFactoryImpl
} from "../../../domain/factories";
import {Application} from "../../../infrastructures/abstractions/application";
import {APIApplicationImpl} from "../../../infrastructures/application";
import {Logger} from "../../../components/abstractions/logger";
import {ConsoleLogger} from "../../../components/logger";
import {
    PostForTelegramRepository,
    CityRepository,
    DistrictRepository,
    PrayersInDayRepository, TelegramChatRepository, TemplatePhotoRepository,
    UserRepository
} from "../../../repositories/abstractions";
import {
    PostForTelegramRepositoryImpl,
    PrayersInDayRepositoryImpl, TelegramChatRepositoryImpl,
    TemplatePhotoRepositoryImpl,
    UserRepositoryImpl,
    DistrictRepositoryImpl,
    CityRepositoryImpl
} from "../../../repositories";
import {Storage} from "../../../infrastructures/abstractions";
import {BaseMongoStorageImpl} from "../../../infrastructures/db";
import {RequestFactory} from "../../../domain/abstractions/factories/request";
import {RequestFactoryImpl} from "../../../domain/factories/request";

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
    bind<AddressFactory>(Symbols.Factories.Address).to(AddressFactoryImpl).inSingletonScope()
    bind<DistrictFactory>(Symbols.Factories.District).to(DistrictFactoryImpl).inSingletonScope()
    bind<PrayersInDayFactory>(Symbols.Factories.PrayersInDay).to(PrayersInDayFactoryImpl).inSingletonScope()
    bind<TemplatePhotoFactory>(Symbols.Factories.TemplatePhoto).to(TemplatePhotoFactoryImpl).inSingletonScope()
    bind<TelegramChatFactory>(Symbols.Factories.TelegramChat).to(TelegramChatFactoryImpl).inSingletonScope()
    bind<PostForTelegramFactory>(Symbols.Factories.PostForTelegram).to(PostForTelegramFactoryImpl).inSingletonScope()
    bind<RequestFactory>(Symbols.Factories.PostForTelegram).to(RequestFactoryImpl).inSingletonScope()

    // Repositories
    bind<CityRepository>(Symbols.Repositories.City).to(CityRepositoryImpl).inSingletonScope()
    bind<UserRepository>(Symbols.Repositories.User).to(UserRepositoryImpl).inSingletonScope()
    bind<PrayersInDayRepository>(Symbols.Repositories.PrayersInDay).to(PrayersInDayRepositoryImpl).inSingletonScope()
    bind<DistrictRepository>(Symbols.Repositories.District).to(DistrictRepositoryImpl).inSingletonScope()
    bind<TemplatePhotoRepository>(Symbols.Repositories.TemplatePhoto).to(TemplatePhotoRepositoryImpl).inSingletonScope()
    bind<TelegramChatRepository>(Symbols.Repositories.TelegramChat).to(TelegramChatRepositoryImpl).inSingletonScope()
    bind<PostForTelegramRepository>(Symbols.Repositories.PostForTelegram).to(PostForTelegramRepositoryImpl).inSingletonScope()
})