import {ContainerModule} from "inversify";
import {Symbols} from "../../symbols";
import {Storage} from "../../../infrastructures/abstractions";
import {BaseMongoStorageImpl} from "../../../infrastructures/db";
import {SchedulerConfig, SchedulerFactory} from "../../../components/abstractions/schduler";
import {SchedulerFactoryImpl} from "../../../components/schduler";
import {Application} from "../../../infrastructures/abstractions/application";
import {SchedulerApplicationImpl} from "../../../infrastructures/application";
import {Logger} from "../../../components/abstractions/logger";
import {ConsoleLogger} from "../../../components/logger";
import {RegularSendingPrayerTimesSchedulerConfig} from "../../../components/schduler/config";
import {Controller} from "../../../controllers/abstractions";
import {SendingPrayerTimesController} from "../../../controllers";
import {
    ChatForSendingPrayerTimesFactory,
    TelegramChannelFactory,
    TemplatePhotoFactory,
    DistrictFactory,
    AddressFactory,
    MosqueFactory,
    PrayersInDayFactory,
    CityFactory,
    UserFactory, IslamicMonthFactory, IslamicCalendarFactory, PrayerTimesFactory
} from "../../../domain/abstractions/factories";
import {
    ChatForSendingPrayerTimesFactoryImpl,
    TelegramChannelFactoryImpl,
    TemplatePhotoFactoryImpl,
    DistrictFactoryImpl,
    AddressFactoryImpl,
    MosqueFactoryImpl,
    PrayersInDayFactoryImpl,
    CityFactoryImpl,
    UserFactoryImpl, IslamicCalendarFactoryImpl, IslamicMonthFactoryImpl
} from "../../../domain/factories";
import {
    ChatForSendingPrayerTimesRepository,
    CityRepository,
    DistrictRepository, IslamicCalendarRepository, IslamicMonthRepository,
    MosqueRepository,
    PrayersInDayRepository, TelegramChannelRepository, TemplatePhotoRepository,
    UserRepository
} from "../../../repositories/abstractions";
import {
    ChatForSendingPrayerTimesRepositoryImpl,
    CityRepositoryImpl, DistrictRepositoryImpl,
    IslamicCalendarRepositoryImpl,
    IslamicMonthRepositoryImpl,
    MosqueRepositoryImpl,
    PrayersInDayRepositoryImpl,
    TelegramChannelRepositoryImpl,
    TemplatePhotoRepositoryImpl,
    UserRepositoryImpl
} from "../../../repositories";
import {
    GetAllExecuteTimeChatsForSendingUseCase, MassSendPrayerTimesToTelegramChannelsUseCase,
    SendPrayerTimesToTelegramChannelUseCase
} from "../../../use-cases/abstractions";
import {
    GetAllExecuteTimeChatsForSendingUseCaseImpl,
    MassSendPrayerTimesToTelegramChannelsUseCaseImpl, SendPrayerTimesToTelegramChannelUseCaseImpl
} from "../../../use-cases";
import {HtmlTableToJsonService} from "../../../services/abstractions/html-table-to-json-service";
import {HtmlTableToJsonServiceImpl} from "../../../services/html-table-to-json-service";
import {TemplatePhotoService} from "../../../services/abstractions/template-photo-service";
import {TemplatePhotoServiceImpl} from "../../../services/template-photo-service";
import {PrayerTimesFactoryImpl} from "../../../domain/factories/prayers-in-day/prayer-times";
import {AladhanClient} from "../../../clients/abstractions/aladhan-client";
import {AladhanClientImpl} from "../../../clients/aladhan-client";
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
    bind<Controller>(Symbols.Controllers.Scheduler).to(SendingPrayerTimesController).inSingletonScope()

    // Factories
    bind<ChatForSendingPrayerTimesFactory>(Symbols.Factories.ChatForSendingPrayerTimes).to(ChatForSendingPrayerTimesFactoryImpl).inSingletonScope()
    bind<TelegramChannelFactory>(Symbols.Factories.TelegramChannel).to(TelegramChannelFactoryImpl).inSingletonScope()
    bind<TemplatePhotoFactory>(Symbols.Factories.TemplatePhoto).to(TemplatePhotoFactoryImpl).inSingletonScope()
    bind<SchedulerFactory>(Symbols.Factories.Scheduler).to(SchedulerFactoryImpl).inSingletonScope()
    bind<DistrictFactory>(Symbols.Factories.District).to(DistrictFactoryImpl).inSingletonScope()
    bind<AddressFactory>(Symbols.Factories.Address).to(AddressFactoryImpl).inSingletonScope()
    bind<PrayerTimesFactory>(Symbols.Factories.PrayerTimes).to(PrayerTimesFactoryImpl).inSingletonScope()
    bind<PrayersInDayFactory>(Symbols.Factories.PrayersInDay).to(PrayersInDayFactoryImpl).inSingletonScope()
    bind<MosqueFactory>(Symbols.Factories.Mosque).to(MosqueFactoryImpl).inSingletonScope()
    bind<UserFactory>(Symbols.Factories.User).to(UserFactoryImpl).inSingletonScope()
    bind<CityFactory>(Symbols.Factories.City).to(CityFactoryImpl).inSingletonScope()
    bind<IslamicCalendarFactory>(Symbols.Factories.IslamicCalendar).to(IslamicCalendarFactoryImpl).inSingletonScope()
    bind<IslamicMonthFactory>(Symbols.Factories.IslamicMonth).to(IslamicMonthFactoryImpl).inSingletonScope()

    // Repositories
    bind<ChatForSendingPrayerTimesRepository>(Symbols.Repositories.ChatForSendingPrayerTimes).to(ChatForSendingPrayerTimesRepositoryImpl).inSingletonScope()
    bind<TelegramChannelRepository>(Symbols.Repositories.TelegramChannel).to(TelegramChannelRepositoryImpl).inSingletonScope()
    bind<TemplatePhotoRepository>(Symbols.Repositories.TemplatePhoto).to(TemplatePhotoRepositoryImpl).inSingletonScope()
    bind<DistrictRepository>(Symbols.Repositories.District).to(DistrictRepositoryImpl).inSingletonScope()
    bind<PrayersInDayRepository>(Symbols.Repositories.PrayersInDay).to(PrayersInDayRepositoryImpl).inSingletonScope()
    bind<MosqueRepository>(Symbols.Repositories.Mosque).to(MosqueRepositoryImpl).inSingletonScope()
    bind<UserRepository>(Symbols.Repositories.User).to(UserRepositoryImpl).inSingletonScope()
    bind<CityRepository>(Symbols.Repositories.City).to(CityRepositoryImpl).inSingletonScope()
    bind<IslamicCalendarRepository>(Symbols.Repositories.IslamicCalendar).to(IslamicCalendarRepositoryImpl).inSingletonScope()
    bind<IslamicMonthRepository>(Symbols.Repositories.IslamicMonth).to(IslamicMonthRepositoryImpl).inSingletonScope()

    // Client
    bind<TelegramBotClient>(Symbols.Clients.TelegramBot).to(TelegramBotClientImpl).inSingletonScope()

    // Use cases
    bind<MassSendPrayerTimesToTelegramChannelsUseCase>(Symbols.UseCases.MassSendPrayerTimesToTelegramChannels).to(MassSendPrayerTimesToTelegramChannelsUseCaseImpl).inSingletonScope()
    bind<GetAllExecuteTimeChatsForSendingUseCase>(Symbols.UseCases.GetAllExecuteTimeChatsForSending).to(GetAllExecuteTimeChatsForSendingUseCaseImpl).inSingletonScope()
    bind<SendPrayerTimesToTelegramChannelUseCase>(Symbols.UseCases.SendPrayerTimesToTelegramChannel).to(SendPrayerTimesToTelegramChannelUseCaseImpl).inSingletonScope()
})