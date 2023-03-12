import {ContainerModule} from "inversify";
import {Symbols} from "../../symbols";
import {Storage} from "../../../infrastructures/abstractions";
import {BaseMongoStorageImpl} from "../../../infrastructures/database";
import {SchedulerConfig, SchedulerFactory} from "../../../components/abstractions/schduler";
import {SchedulerFactoryImpl} from "../../../components/schduler";
import {Application} from "../../../infrastructures/abstractions/application";
import {SchedulerApplicationImpl} from "../../../infrastructures/application";
import {Logger} from "../../../components/abstractions/logger";
import {ConsoleLogger} from "../../../components/logger";
import {RegularSendingPrayerTimesSchedulerConfig} from "../../../components/schduler/config";
import {SchedulerController} from "../../../controllers/abstractions";
import {SendingPrayerTimesController} from "../../../controllers";
import {
    PostForTelegramFactory,
    TelegramChatFactory,
    TemplatePhotoFactory,
    DistrictFactory,
    AddressFactory,
    PrayersInDayFactory,
    CityFactory,
    UserFactory, IslamicMonthFactory, IslamicCalendarFactory, PrayerTimesFactory
} from "../../../domain/abstractions/factories";
import {
    PostForTelegramFactoryImpl,
    TelegramChatFactoryImpl,
    TemplatePhotoFactoryImpl,
    DistrictFactoryImpl,
    AddressFactoryImpl,
    PrayersInDayFactoryImpl,
    CityFactoryImpl,
    UserFactoryImpl, IslamicCalendarFactoryImpl, IslamicMonthFactoryImpl
} from "../../../domain/factories";
import {
    PostForTelegramRepository,
    CityRepository,
    DistrictRepository, IslamicCalendarRepository, IslamicMonthRepository,
    PrayersInDayRepository, TelegramChatRepository, TemplatePhotoRepository,
    UserRepository
} from "../../../repositories/abstractions";
import {
    PostForTelegramRepositoryImpl,
    CityRepositoryImpl, DistrictRepositoryImpl,
    IslamicCalendarRepositoryImpl,
    IslamicMonthRepositoryImpl,
    PrayersInDayRepositoryImpl,
    TelegramChatRepositoryImpl,
    TemplatePhotoRepositoryImpl,
    UserRepositoryImpl
} from "../../../repositories";
import {
    GetAllExecuteTimeChatsForSendingUseCase, MassSendPrayerTimesToTelegramChatsUseCase,
    SendPrayerTimesToTelegramChatUseCase
} from "../../../use-cases/abstractions";
import {
    GetAllExecuteTimeChatsForSendingUseCaseImpl,
    MassSendPrayerTimesToTelegramChatsUseCaseImpl, SendPrayerTimesToTelegramChatUseCaseImpl
} from "../../../use-cases";
import {TemplatePhotoService} from "../../../services/abstractions";
import {TemplatePhotoServiceImpl} from "../../../services";
import {PrayerTimesFactoryImpl} from "../../../domain/factories/prayers-in-day/prayer-times";
import {TelegramBotClient} from "../../../clients/abstractions/telegram-bot-client";
import {TelegramBotClientImpl} from "../../../clients/telegram-bot-client";

export const regularSendingPrayerTimesModule = new ContainerModule(bind => {
    // Application
    bind<Application>(Symbols.Infrastructures.Application).to(SchedulerApplicationImpl).inSingletonScope()

    // Storages
    bind<Storage>(Symbols.Infrastructures.Storage).to(BaseMongoStorageImpl).inSingletonScope()

    // Loggers
    bind<Logger>(Symbols.Infrastructures.Logger).to(ConsoleLogger).inSingletonScope()

    // Configs
    bind<SchedulerConfig>(Symbols.Configs.Scheduler).to(RegularSendingPrayerTimesSchedulerConfig).inSingletonScope()

    // Services
    bind<TemplatePhotoService>(Symbols.Services.TemplatePhoto).to(TemplatePhotoServiceImpl)

    // Controllers
    bind<SchedulerController>(Symbols.Controllers.Scheduler).to(SendingPrayerTimesController).inSingletonScope()

    // Factories
    bind<PostForTelegramFactory>(Symbols.Factories.PostForTelegram).to(PostForTelegramFactoryImpl).inSingletonScope()
    bind<TelegramChatFactory>(Symbols.Factories.TelegramChat).to(TelegramChatFactoryImpl).inSingletonScope()
    bind<TemplatePhotoFactory>(Symbols.Factories.TemplatePhoto).to(TemplatePhotoFactoryImpl).inSingletonScope()
    bind<SchedulerFactory>(Symbols.Factories.Scheduler).to(SchedulerFactoryImpl).inSingletonScope()
    bind<DistrictFactory>(Symbols.Factories.District).to(DistrictFactoryImpl).inSingletonScope()
    bind<AddressFactory>(Symbols.Factories.Address).to(AddressFactoryImpl).inSingletonScope()
    bind<PrayerTimesFactory>(Symbols.Factories.PrayerTimes).to(PrayerTimesFactoryImpl).inSingletonScope()
    bind<PrayersInDayFactory>(Symbols.Factories.PrayersInDay).to(PrayersInDayFactoryImpl).inSingletonScope()
    bind<UserFactory>(Symbols.Factories.User).to(UserFactoryImpl).inSingletonScope()
    bind<CityFactory>(Symbols.Factories.City).to(CityFactoryImpl).inSingletonScope()
    bind<IslamicCalendarFactory>(Symbols.Factories.IslamicCalendar).to(IslamicCalendarFactoryImpl).inSingletonScope()
    bind<IslamicMonthFactory>(Symbols.Factories.IslamicMonth).to(IslamicMonthFactoryImpl).inSingletonScope()

    // Repositories
    bind<PostForTelegramRepository>(Symbols.Repositories.PostForTelegram).to(PostForTelegramRepositoryImpl).inSingletonScope()
    bind<TelegramChatRepository>(Symbols.Repositories.TelegramChat).to(TelegramChatRepositoryImpl).inSingletonScope()
    bind<TemplatePhotoRepository>(Symbols.Repositories.TemplatePhoto).to(TemplatePhotoRepositoryImpl).inSingletonScope()
    bind<DistrictRepository>(Symbols.Repositories.District).to(DistrictRepositoryImpl).inSingletonScope()
    bind<PrayersInDayRepository>(Symbols.Repositories.PrayersInDay).to(PrayersInDayRepositoryImpl).inSingletonScope()
    bind<UserRepository>(Symbols.Repositories.User).to(UserRepositoryImpl).inSingletonScope()
    bind<CityRepository>(Symbols.Repositories.City).to(CityRepositoryImpl).inSingletonScope()
    bind<IslamicCalendarRepository>(Symbols.Repositories.IslamicCalendar).to(IslamicCalendarRepositoryImpl).inSingletonScope()
    bind<IslamicMonthRepository>(Symbols.Repositories.IslamicMonth).to(IslamicMonthRepositoryImpl).inSingletonScope()

    // Client
    bind<TelegramBotClient>(Symbols.Clients.TelegramBot).to(TelegramBotClientImpl).inSingletonScope()

    // Use cases
    bind<MassSendPrayerTimesToTelegramChatsUseCase>(Symbols.UseCases.MassSendPrayerTimesToTelegramChats).to(MassSendPrayerTimesToTelegramChatsUseCaseImpl).inSingletonScope()
    bind<GetAllExecuteTimeChatsForSendingUseCase>(Symbols.UseCases.GetAllExecuteTimeChatsForSending).to(GetAllExecuteTimeChatsForSendingUseCaseImpl).inSingletonScope()
    bind<SendPrayerTimesToTelegramChatUseCase>(Symbols.UseCases.SendPrayerTimesToTelegramChat).to(SendPrayerTimesToTelegramChatUseCaseImpl).inSingletonScope()
})