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
    UserFactoryImpl,
    IslamicCalendarFactoryImpl,
    IslamicMonthFactoryImpl,
    RequestFactoryImpl,
    TokenFactoryImpl,
    PrayerTimesFactoryImpl
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
    UserRepository, IslamicCalendarRepository, IslamicMonthRepository, TokenRepository, RequestRepository
} from "../../../repositories/abstractions";
import {
    PostForTelegramRepositoryImpl,
    PrayersInDayRepositoryImpl,
    TelegramChatRepositoryImpl,
    TemplatePhotoRepositoryImpl,
    UserRepositoryImpl,
    DistrictRepositoryImpl,
    CityRepositoryImpl,
    IslamicCalendarRepositoryImpl,
    IslamicMonthRepositoryImpl,
    RequestRepositoryImpl,
    TokenRepositoryImpl
} from "../../../repositories";
import {Storage, Transport} from "../../../infrastructures/abstractions";
import {BaseMongoStorageImpl} from "../../../infrastructures/database";
import {RequestFactory} from "../../../domain/abstractions/factories/request";
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
    CreateRequestForRegisterUseCase, GetMeAuthorizationUseCase,
    GetTodayPrayerTimesUseCase, LoginAuthorizationUseCase, RegistrationAuthorizationUseCase
} from "../../../use-cases/abstractions";
import {
    CreatePostForTelegramUseCaseImpl,
    GetTodayPrayerTimesUseCaseImpl,
    CreateRequestForRegisterUseCaseImpl,
    LoginAuthorizationUseCaseImpl,
    RegistrationAuthorizationUseCaseImpl,
    GetMeAuthorizationUseCaseImpl
} from "../../../use-cases";
import {TelegramBotClient} from "../../../clients/abstractions";
import {TelegramBotClientImpl} from "../../../clients";
import {CryptoService, TemplatePhotoService, TokenService} from "../../../services/abstractions";
import {CryptoServiceImpl, TemplatePhotoServiceImpl, TokenServiceImpl} from "../../../services";
import {
    CreatePostForTelegramPresenter, GetTodayPrayerTimesPresenter,
    CreateRequestForRegisterPresenter,
    RegistrationAuthorizationPresenter,
    LoginAuthorizationPresenter,
    GetMeAuthorizationPresenter,
} from "../../../presenters/abstractions";
import {
    CreatePostForTelegramPresenterImpl,
    GetTodayPrayerTimesPresenterImpl,
    RegistrationAuthorizationPresenterImpl,
    GetMeAuthorizationPresenterImpl,
    CreateRequestForRegisterPresenterImpl,
    LoginAuthorizationPresenterImpl
} from "../../../presenters";
import {Middleware} from "../../../infrastructures/transport/abstractions/http/middleware";
import {CookieParserMiddleware} from "../../../infrastructures/transport/http/middleware";
import {RouterBase} from "../../../infrastructures/transport/abstractions/http/routers";
import {AuthorizationRouterImpl} from "../../../infrastructures/transport/http/routers";
import {IsAdminGuard} from "../../../infrastructures/abstractions/guards";
import {IsAdminGuardImpl} from "../../../infrastructures/guards";
import {PostDataFactoryImpl} from "../../../domain/factories/post-for-telegram/post-data";
import {PostDataFactory} from "../../../domain/abstractions/factories/post-for-telegram/post-data";
import {GetAllRequestUseCaseImpl} from "../../../use-cases/api/namaz-time-api/request/get-all-request-use-case";
import {
    GetAllRequestUseCase
} from "../../../use-cases/abstractions/api/namaz-time-api/request/get-all-request-use-case";
import {GetAllRequestPresenter} from "../../../presenters/abstractions/request/get-all-request-presenter";
import {GetAllRequestPresenterImpl} from "../../../presenters/request/get-all-request-presenter";

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

    // Guards
    bind<IsAdminGuard>(Symbols.Infrastructures.Guard.IsAdmin).to(IsAdminGuardImpl).inSingletonScope()

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
    bind<PostDataFactory>(Symbols.Factories.PostData).to(PostDataFactoryImpl).inSingletonScope()
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
    bind<CreateRequestForRegisterUseCase>(Symbols.UseCases.Request.CreateForRegister).to(CreateRequestForRegisterUseCaseImpl).inSingletonScope()
    bind<GetAllRequestUseCase>(Symbols.UseCases.Request.GetAll).to(GetAllRequestUseCaseImpl).inSingletonScope()
    bind<CreatePostForTelegramUseCase>(Symbols.UseCases.PostForTelegram.Create).to(CreatePostForTelegramUseCaseImpl).inSingletonScope()
    bind<GetTodayPrayerTimesUseCase>(Symbols.UseCases.PrayerTimes.GetToday).to(GetTodayPrayerTimesUseCaseImpl).inSingletonScope()
    bind<RegistrationAuthorizationUseCase>(Symbols.UseCases.Authorization.Registration).to(RegistrationAuthorizationUseCaseImpl).inSingletonScope()
    bind<LoginAuthorizationUseCase>(Symbols.UseCases.Authorization.Login).to(LoginAuthorizationUseCaseImpl).inSingletonScope()
    bind<GetMeAuthorizationUseCase>(Symbols.UseCases.Authorization.GetMe).to(GetMeAuthorizationUseCaseImpl).inSingletonScope()

    // Controllers
    bind<AuthorizationController>(Symbols.Controllers.Authorization).to(AuthorizationControllerImpl).inSingletonScope()
    bind<PostForTelegramController>(Symbols.Controllers.PostForTelegram).to(PostForTelegramControllerImpl).inSingletonScope()
    bind<PrayerTimesController>(Symbols.Controllers.PrayerTimes).to(PrayerTimesControllerImpl).inSingletonScope()
    bind<RequestController>(Symbols.Controllers.Request).to(RequestControllerImpl).inSingletonScope()

    // Presenters
    bind<RegistrationAuthorizationPresenter>(Symbols.Presenters.Authorization.Registration).to(RegistrationAuthorizationPresenterImpl).inSingletonScope()
    bind<GetAllRequestPresenter>(Symbols.Presenters.Request.GetAll).to(GetAllRequestPresenterImpl).inSingletonScope()
    bind<CreateRequestForRegisterPresenter>(Symbols.Presenters.Request.CreateForRegister).to(CreateRequestForRegisterPresenterImpl).inSingletonScope()
    bind<CreatePostForTelegramPresenter>(Symbols.Presenters.PostForTelegram.Create).to(CreatePostForTelegramPresenterImpl).inSingletonScope()
    bind<GetTodayPrayerTimesPresenter>(Symbols.Presenters.PrayerTimes.GetToday).to(GetTodayPrayerTimesPresenterImpl).inSingletonScope()
    bind<LoginAuthorizationPresenter>(Symbols.Presenters.Authorization.Login).to(LoginAuthorizationPresenterImpl).inSingletonScope()
    bind<GetMeAuthorizationPresenter>(Symbols.Presenters.Authorization.GetMe).to(GetMeAuthorizationPresenterImpl).inSingletonScope()
})