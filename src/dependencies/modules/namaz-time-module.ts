import {ContainerModule} from "inversify";
import {Symbols} from "../symbols";
import {
    AddressFactory,
    CityFactory,
    DistrictFactory,
    MosqueFactory, PrayerFactory, TelegramChannelFactory,
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
import {NamazTimeStorageImpl} from "../../components/storage/namaz-time-storage";
import {NamazTimeStorage} from "../../components/abstractions/storage";

export const namazTimeModule = new ContainerModule(bind => {
    // Factories
    bind<CityFactory>(Symbols.Factories.City).to(CityFactoryImpl).inSingletonScope()
    bind<UserFactory>(Symbols.Factories.User).to(UserFactoryImpl).inSingletonScope()
    bind<MosqueFactory>(Symbols.Factories.Mosque).to(MosqueFactoryImpl).inSingletonScope()
    bind<PrayerFactory>(Symbols.Factories.Prayer).to(PrayerFactoryImpl).inSingletonScope()
    bind<AddressFactory>(Symbols.Factories.Address).to(AddressFactoryImpl).inSingletonScope()
    bind<DistrictFactory>(Symbols.Factories.District).to(DistrictFactoryImpl).inSingletonScope()
    bind<TemplatePhotoFactory>(Symbols.Factories.TemplatePhoto).to(TemplatePhotoFactoryImpl).inSingletonScope()
    bind<TelegramChannelFactory>(Symbols.Factories.TelegramChannel).to(TelegramChannelFactoryImpl).inSingletonScope()

    // Storages
    bind<NamazTimeStorage>(Symbols.Storages.NamazTime).to(NamazTimeStorageImpl).inSingletonScope()
})