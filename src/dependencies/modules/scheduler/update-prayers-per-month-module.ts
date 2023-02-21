import {ContainerModule} from "inversify";
import {Symbols} from "../../symbols";
import {SchedulerConfig, SchedulerFactory} from "../../../components/abstractions/schduler";
import {SchedulerFactoryImpl} from "../../../components/schduler";
import {Application} from "../../../infrastructures/abstractions/application";
import {SchedulerApplicationImpl} from "../../../infrastructures/application";
import {Logger} from "../../../components/abstractions/logger";
import {ConsoleLogger} from "../../../components/logger";
import {SchedulerController} from "../../../controllers/abstractions";
import {UpdatePrayersPerMonthController} from "../../../controllers";
import {
    IslamicCalendarFactory,
    IslamicMonthFactory,
    PrayersInDayFactory,
    PrayerTimesFactory
} from "../../../domain/abstractions/factories";
import {IslamicCalendarFactoryImpl, IslamicMonthFactoryImpl, PrayersInDayFactoryImpl} from "../../../domain/factories";
import {
    IslamicCalendarRepository,
    IslamicMonthRepository,
    PrayersInDayRepository
} from "../../../repositories/abstractions";
import {
    IslamicCalendarRepositoryImpl,
    IslamicMonthRepositoryImpl,
    PrayersInDayRepositoryImpl
} from "../../../repositories";
import {Storage} from "../../../infrastructures/abstractions";
import {BaseMongoStorageImpl} from "../../../infrastructures/db";
import {UpdateIslamicCalendarUseCaseImpl, UpdatePrayersPerMonthUseCaseImpl} from "../../../use-cases";
import {UpdateIslamicCalendarUseCase, UpdatePrayersPerMonthUseCase} from "../../../use-cases/abstractions";
import {UpdatePrayersPerMonthSchedulerConfig} from "../../../components/schduler/config";
import {HtmlTableToJsonService} from "../../../services/abstractions/html-table-to-json-service";
import {HtmlTableToJsonServiceImpl} from "../../../services/html-table-to-json-service";
import {AladhanClient} from "../../../clients/abstractions/aladhan-client";
import {AladhanClientImpl} from "../../../clients/aladhan-client";
import {NamozVaqtiClient} from "../../../clients/abstractions/namoz-vaqti-client";
import {NamozVaqtiClientImpl} from "../../../clients/namoz-vaqti-client";
import {PrayerTimesFactoryImpl} from "../../../domain/factories/prayers-in-day/prayer-times";

export const updatePrayersPerMonthModule = new ContainerModule(bind => {
    // Application
    bind<Application>(Symbols.Infrastructures.Application).to(SchedulerApplicationImpl).inSingletonScope()

    // Storages
    bind<Storage>(Symbols.Infrastructures.Storage).to(BaseMongoStorageImpl).inSingletonScope()

    // Loggers
    bind<Logger>(Symbols.Infrastructures.Logger).to(ConsoleLogger).inSingletonScope()

    // Configs
    bind<SchedulerConfig>(Symbols.Configs.Scheduler).to(UpdatePrayersPerMonthSchedulerConfig).inSingletonScope()

    // Services
    bind<HtmlTableToJsonService>(Symbols.Services.HtmlTableToJson).to(HtmlTableToJsonServiceImpl)

    // Controllers
    bind<SchedulerController>(Symbols.Controllers.Scheduler).to(UpdatePrayersPerMonthController).inSingletonScope()

    // Factories
    bind<SchedulerFactory>(Symbols.Factories.Scheduler).to(SchedulerFactoryImpl).inSingletonScope()
    bind<PrayerTimesFactory>(Symbols.Factories.PrayerTimes).to(PrayerTimesFactoryImpl).inSingletonScope()
    bind<PrayersInDayFactory>(Symbols.Factories.PrayersInDay).to(PrayersInDayFactoryImpl).inSingletonScope()
    bind<IslamicCalendarFactory>(Symbols.Factories.IslamicCalendar).to(IslamicCalendarFactoryImpl).inSingletonScope()
    bind<IslamicMonthFactory>(Symbols.Factories.IslamicMonth).to(IslamicMonthFactoryImpl).inSingletonScope()

    // Repositories
    bind<PrayersInDayRepository>(Symbols.Repositories.PrayersInDay).to(PrayersInDayRepositoryImpl).inSingletonScope()
    bind<IslamicCalendarRepository>(Symbols.Repositories.IslamicCalendar).to(IslamicCalendarRepositoryImpl).inSingletonScope()
    bind<IslamicMonthRepository>(Symbols.Repositories.IslamicMonth).to(IslamicMonthRepositoryImpl).inSingletonScope()

    // Client
    bind<AladhanClient>(Symbols.Clients.Aladhan).to(AladhanClientImpl).inSingletonScope()
    bind<NamozVaqtiClient>(Symbols.Clients.NamozVaqti).to(NamozVaqtiClientImpl).inSingletonScope()

    // Use cases
    bind<UpdatePrayersPerMonthUseCase>(Symbols.UseCases.UpdatePrayersPerMonth).to(UpdatePrayersPerMonthUseCaseImpl).inSingletonScope()
    bind<UpdateIslamicCalendarUseCase>(Symbols.UseCases.UpdateIslamicCalendar).to(UpdateIslamicCalendarUseCaseImpl).inSingletonScope()
})