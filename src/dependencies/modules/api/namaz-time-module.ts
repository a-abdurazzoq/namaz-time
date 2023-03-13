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
    UserFactory, IslamicCalendarFactory, IslamicMonthFactory, PrayerTimesFactory, TokenFactory
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
import {Application} from "../../../infrastructures/abstractions/application";
import {APIApplicationImpl} from "../../../infrastructures/application";
import {Logger} from "../../../components/abstractions/logger";
import {ConsoleLogger} from "../../../components/logger";
import {
    PostForTelegramRepository,
    CityRepository,
    DistrictRepository,
    PrayersInDayRepository, TelegramChatRepository, TemplatePhotoRepository,
    UserRepository, IslamicCalendarRepository, IslamicMonthRepository, TokenRepository
} from "../../../repositories/abstractions";
import {
    PostForTelegramRepositoryImpl,
    PrayersInDayRepositoryImpl, TelegramChatRepositoryImpl,
    TemplatePhotoRepositoryImpl,
    UserRepositoryImpl,
    DistrictRepositoryImpl,
    CityRepositoryImpl, IslamicCalendarRepositoryImpl, IslamicMonthRepositoryImpl
} from "../../../repositories";
import {Storage, Transport} from "../../../infrastructures/abstractions";
import {BaseMongoStorageImpl} from "../../../infrastructures/database";
import {RequestFactory} from "../../../domain/abstractions/factories/request";
import {RequestFactoryImpl} from "../../../domain/factories/request";
import {TransportHttpImpl} from "../../../infrastructures/transport/http";
import {
    PostForTelegramRouterImpl,
    PrayerTimesRouterImpl,
    RequestRouterImpl
} from "../../../infrastructures/transport/http/routers";
import {
    PostForTelegramController,
    PrayerTimesController,
    RequestController,
    AuthorizationController
} from "../../../controllers/abstractions";
import {
    PostForTelegramControllerImpl,
    PrayerTimesControllerImpl,
    RequestControllerImpl,
    AuthorizationControllerImpl
} from "../../../controllers";
import {
    CreatePostForTelegramUseCase,
    CreateRequestForRegisterUseCase,
    GetTodayPrayerTimesUseCase, LoginAuthorizationUseCase, RegistrationAuthorizationUseCase
} from "../../../use-cases/abstractions";
import {
    CreatePostForTelegramUseCaseImpl,
    GetTodayPrayerTimesUseCaseImpl,
    CreateRequestForRegisterUseCaseImpl,
    LoginAuthorizationUseCaseImpl,
    RegistrationAuthorizationUseCaseImpl
} from "../../../use-cases";
import {TelegramBotClient} from "../../../clients/abstractions/telegram-bot-client";
import {TelegramBotClientImpl} from "../../../clients/telegram-bot-client";
import {CryptoService, TemplatePhotoService, TokenService} from "../../../services/abstractions";
import {CryptoServiceImpl, TemplatePhotoServiceImpl, TokenServiceImpl} from "../../../services";
import {PrayerTimesFactoryImpl} from "../../../domain/factories/prayers-in-day/prayer-times";
import {RequestRepository} from "../../../repositories/abstractions/request-repository";
import {RequestRepositoryImpl} from "../../../repositories/request-repository";
import {
    CreatePostForTelegramPresenter
} from "../../../presenters/abstractions/post-for-telegram/create-post-for-telegram-presenter";
import {
    CreatePostForTelegramPresenterImpl
} from "../../../presenters/post-for-telegram/create-post-for-telegram-presenter";
import {
    GetTodayPrayerTimesPresenter
} from "../../../presenters/abstractions/prayer-times/get-today-prayer-times-presenter";
import {GetTodayPrayerTimesPresenterImpl} from "../../../presenters/prayer-times/get-today-prayer-times-presenter";
import {
    CreateRequestForRegisterPresenter
} from "../../../presenters/abstractions/request/create-request-for-register-presenter";
import {CreateRequestForRegisterPresenterImpl} from "../../../presenters/request/create-request-for-register-presenter";
import {Middleware} from "../../../infrastructures/transport/abstractions/http/middleware";
import {CookieParserMiddleware} from "../../../infrastructures/transport/http/middleware/cookie-parser";
import {TokenFactoryImpl} from "../../../domain/factories/token";
import {
    RegistrationAuthorizationPresenter
} from "../../../presenters/abstractions/authorization/registration-authorization-presenter";
import {
    LoginAuthorizationPresenter
} from "../../../presenters/abstractions/authorization/login-authorization-presenter";
import {
    RegistrationAuthorizationPresenterImpl
} from "../../../presenters/authorization/registration-authorization-presenter";
import {LoginAuthorizationPresenterImpl} from "../../../presenters/authorization/login-authorization-presenter";
import {RouterBase} from "../../../infrastructures/transport/abstractions/http/routers";
import {AuthorizationRouterImpl} from "../../../infrastructures/transport/http/routers";
import {TokenRepositoryImpl} from "../../../repositories/token-repository";

export const namazTimeModule = new ContainerModule(bind => {
    // Application
    bind<Application>(Symbols.Infrastructures.Application).to(APIApplicationImpl).inSingletonScope()

    // Transport
    bind<Transport>(Symbols.Infrastructures.Transport).to(TransportHttpImpl).inSingletonScope()

    // Storages
    bind<Storage>(Symbols.Infrastructures.Storage).to(BaseMongoStorageImpl).inSingletonScope()

    // Loggers
    bind<Logger>(Symbols.Infrastructures.Logger).to(ConsoleLogger).inSingletonScope()

    // Services
    bind<TemplatePhotoService>(Symbols.Services.TemplatePhoto).to(TemplatePhotoServiceImpl)
    bind<CryptoService>(Symbols.Services.Crypto).to(CryptoServiceImpl)
    bind<TokenService>(Symbols.Services.Token).to(TokenServiceImpl)

    // Routers
    bind<RouterBase>(Symbols.Infrastructures.Http.Routers).to(AuthorizationRouterImpl).inSingletonScope()
    bind<RouterBase>(Symbols.Infrastructures.Http.Routers).to(PostForTelegramRouterImpl).inSingletonScope()
    bind<RouterBase>(Symbols.Infrastructures.Http.Routers).to(PrayerTimesRouterImpl).inSingletonScope()
    bind<RouterBase>(Symbols.Infrastructures.Http.Routers).to(RequestRouterImpl).inSingletonScope()

    // Middleware
    bind<Middleware>(Symbols.Infrastructures.Http.Middleware).to(CookieParserMiddleware).inSingletonScope()

    // Factories
    bind<CityFactory>(Symbols.Factories.City).to(CityFactoryImpl).inSingletonScope()
    bind<UserFactory>(Symbols.Factories.User).to(UserFactoryImpl).inSingletonScope()
    bind<TokenFactory>(Symbols.Factories.Token).to(TokenFactoryImpl).inSingletonScope()
    bind<AddressFactory>(Symbols.Factories.Address).to(AddressFactoryImpl).inSingletonScope()
    bind<RequestFactory>(Symbols.Factories.Request).to(RequestFactoryImpl).inSingletonScope()
    bind<DistrictFactory>(Symbols.Factories.District).to(DistrictFactoryImpl).inSingletonScope()
    bind<PrayerTimesFactory>(Symbols.Factories.PrayerTimes).to(PrayerTimesFactoryImpl).inSingletonScope()
    bind<PrayersInDayFactory>(Symbols.Factories.PrayersInDay).to(PrayersInDayFactoryImpl).inSingletonScope()
    bind<IslamicMonthFactory>(Symbols.Factories.IslamicMonth).to(IslamicMonthFactoryImpl).inSingletonScope()
    bind<TelegramChatFactory>(Symbols.Factories.TelegramChat).to(TelegramChatFactoryImpl).inSingletonScope()
    bind<TemplatePhotoFactory>(Symbols.Factories.TemplatePhoto).to(TemplatePhotoFactoryImpl).inSingletonScope()
    bind<PostForTelegramFactory>(Symbols.Factories.PostForTelegram).to(PostForTelegramFactoryImpl).inSingletonScope()
    bind<IslamicCalendarFactory>(Symbols.Factories.IslamicCalendar).to(IslamicCalendarFactoryImpl).inSingletonScope()

    // Client
    bind<TelegramBotClient>(Symbols.Clients.TelegramBot).to(TelegramBotClientImpl).inSingletonScope()

    // Repositories
    bind<CityRepository>(Symbols.Repositories.City).to(CityRepositoryImpl).inSingletonScope()
    bind<UserRepository>(Symbols.Repositories.User).to(UserRepositoryImpl).inSingletonScope()
    bind<PrayersInDayRepository>(Symbols.Repositories.PrayersInDay).to(PrayersInDayRepositoryImpl).inSingletonScope()
    bind<DistrictRepository>(Symbols.Repositories.District).to(DistrictRepositoryImpl).inSingletonScope()
    bind<TemplatePhotoRepository>(Symbols.Repositories.TemplatePhoto).to(TemplatePhotoRepositoryImpl).inSingletonScope()
    bind<TelegramChatRepository>(Symbols.Repositories.TelegramChat).to(TelegramChatRepositoryImpl).inSingletonScope()
    bind<PostForTelegramRepository>(Symbols.Repositories.PostForTelegram).to(PostForTelegramRepositoryImpl).inSingletonScope()
    bind<IslamicCalendarRepository>(Symbols.Repositories.IslamicCalendar).to(IslamicCalendarRepositoryImpl).inSingletonScope()
    bind<IslamicMonthRepository>(Symbols.Repositories.IslamicMonth).to(IslamicMonthRepositoryImpl).inSingletonScope()
    bind<RequestRepository>(Symbols.Repositories.Request).to(RequestRepositoryImpl).inSingletonScope()
    bind<TokenRepository>(Symbols.Repositories.Token).to(TokenRepositoryImpl).inSingletonScope()

    // Use Cases
    bind<RegistrationAuthorizationUseCase>(Symbols.UseCases.Authorization.Registration).to(RegistrationAuthorizationUseCaseImpl).inSingletonScope()
    bind<CreateRequestForRegisterUseCase>(Symbols.UseCases.Request.CreateForRegister).to(CreateRequestForRegisterUseCaseImpl).inSingletonScope()
    bind<CreatePostForTelegramUseCase>(Symbols.UseCases.PostForTelegram.Create).to(CreatePostForTelegramUseCaseImpl).inSingletonScope()
    bind<GetTodayPrayerTimesUseCase>(Symbols.UseCases.PrayerTimes.GetToday).to(GetTodayPrayerTimesUseCaseImpl).inSingletonScope()
    bind<LoginAuthorizationUseCase>(Symbols.UseCases.Authorization.Login).to(LoginAuthorizationUseCaseImpl).inSingletonScope()

    // Controllers
    bind<AuthorizationController>(Symbols.Controllers.Authorization).to(AuthorizationControllerImpl).inSingletonScope()
    bind<PostForTelegramController>(Symbols.Controllers.PostForTelegram).to(PostForTelegramControllerImpl).inSingletonScope()
    bind<PrayerTimesController>(Symbols.Controllers.PrayerTimes).to(PrayerTimesControllerImpl).inSingletonScope()
    bind<RequestController>(Symbols.Controllers.Request).to(RequestControllerImpl).inSingletonScope()

    // Presenters
    bind<RegistrationAuthorizationPresenter>(Symbols.Presenters.Authorization.Registration).to(RegistrationAuthorizationPresenterImpl).inSingletonScope()
    bind<CreateRequestForRegisterPresenter>(Symbols.Presenters.Request.CreateForRegister).to(CreateRequestForRegisterPresenterImpl).inSingletonScope()
    bind<CreatePostForTelegramPresenter>(Symbols.Presenters.PostForTelegram.Create).to(CreatePostForTelegramPresenterImpl).inSingletonScope()
    bind<GetTodayPrayerTimesPresenter>(Symbols.Presenters.PrayerTimes.GetToday).to(GetTodayPrayerTimesPresenterImpl).inSingletonScope()
    bind<LoginAuthorizationPresenter>(Symbols.Presenters.Authorization.Login).to(LoginAuthorizationPresenterImpl).inSingletonScope()
})