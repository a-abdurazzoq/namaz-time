import {ContainerModule} from "inversify";
import {SeedDataApplication} from "../../../infrastructures/application/types/seed-data";
import {Application} from "../../../infrastructures/abstractions/application";
import {Symbols} from "../../symbols";
import {DistrictsSeedDataModule} from "../../../infrastructures/db/seed-data/module/districts";
import {CitiesSeedDataModule} from "../../../infrastructures/db/seed-data/module/cities";
import {SeedData, SeedDataModule} from "../../../infrastructures/abstractions/db/seed-data";
import {SeedDataImpl} from "../../../infrastructures/db/seed-data";
import {IslamicMonthsSeedDataModule} from "../../../infrastructures/db/seed-data/module/islamic-months";
import {Storage} from "../../../infrastructures/abstractions";
import {BaseMongoStorageImpl} from "../../../infrastructures/db";
import {
    IslamicMonthFactory,
    CityFactory,
    DistrictFactory,
    PrayerTimesFactory, PrayersInDayFactory, IslamicCalendarFactory
} from "../../../domain/abstractions/factories";
import {
    IslamicMonthFactoryImpl,
    CityFactoryImpl,
    DistrictFactoryImpl,
    PrayersInDayFactoryImpl, IslamicCalendarFactoryImpl
} from "../../../domain/factories";
import {
    IslamicMonthRepository,
    CityRepository,
    DistrictRepository,
    PrayersInDayRepository, IslamicCalendarRepository
} from "../../../repositories/abstractions";
import {
    IslamicMonthRepositoryImpl,
    DistrictRepositoryImpl,
    CityRepositoryImpl,
    PrayersInDayRepositoryImpl, IslamicCalendarRepositoryImpl
} from "../../../repositories";
import {Logger} from "../../../components/abstractions/logger";
import {ConsoleLogger} from "../../../components/logger";
import {IslamicCalendarSeedDataModule} from "../../../infrastructures/db/seed-data/module/islamic-calendar";
import {PrayerTimesSeedDataModule} from "../../../infrastructures/db/seed-data/module/prayer-times";
import {PrayerTimesFactoryImpl} from "../../../domain/factories/prayers-in-day/prayer-times";
import {NamozVaqtiClient} from "../../../clients/abstractions/namoz-vaqti-client";
import {NamozVaqtiClientImpl} from "../../../clients/namoz-vaqti-client";
import {UpdateIslamicCalendarUseCase, UpdatePrayersPerMonthUseCase} from "../../../use-cases/abstractions";
import {UpdateIslamicCalendarUseCaseImpl, UpdatePrayersPerMonthUseCaseImpl} from "../../../use-cases";
import {SchedulerFactory} from "../../../components/abstractions/schduler";
import {SchedulerFactoryImpl} from "../../../components/schduler";
import {AladhanClientImpl} from "../../../clients/aladhan-client";
import {AladhanClient} from "../../../clients/abstractions/aladhan-client";
import {HtmlTableToJsonService} from "../../../services/abstractions/html-table-to-json-service";
import {HtmlTableToJsonServiceImpl} from "../../../services/html-table-to-json-service";

export const seedDataModule = new ContainerModule((bind) => {
    // Applications
    bind<Application>(Symbols.Infrastructures.Application).to(SeedDataApplication).inSingletonScope()

    // Seed data
    bind<SeedData>(Symbols.Infrastructures.SeedData).to(SeedDataImpl).inSingletonScope()

    // Seed data modules
    bind<SeedDataModule>(Symbols.Infrastructures.SeedDataModules).to(IslamicMonthsSeedDataModule).inSingletonScope()
    bind<SeedDataModule>(Symbols.Infrastructures.SeedDataModules).to(CitiesSeedDataModule).inSingletonScope()
    bind<SeedDataModule>(Symbols.Infrastructures.SeedDataModules).to(DistrictsSeedDataModule).inSingletonScope()
    bind<SeedDataModule>(Symbols.Infrastructures.SeedDataModules).to(IslamicCalendarSeedDataModule).inSingletonScope()
    bind<SeedDataModule>(Symbols.Infrastructures.SeedDataModules).to(PrayerTimesSeedDataModule).inSingletonScope()

    // Loggers
    bind<Logger>(Symbols.Infrastructures.Logger).to(ConsoleLogger).inSingletonScope()

    // Storages
    bind<Storage>(Symbols.Infrastructures.Storage).to(BaseMongoStorageImpl).inSingletonScope()

    // Services
    bind<HtmlTableToJsonService>(Symbols.Services.HtmlTableToJson).to(HtmlTableToJsonServiceImpl)

    // Factories
    bind<IslamicMonthFactory>(Symbols.Factories.IslamicMonth).to(IslamicMonthFactoryImpl).inSingletonScope()
    bind<CityFactory>(Symbols.Factories.City).to(CityFactoryImpl).inSingletonScope()
    bind<DistrictFactory>(Symbols.Factories.District).to(DistrictFactoryImpl).inSingletonScope()
    bind<PrayersInDayFactory>(Symbols.Factories.PrayersInDay).to(PrayersInDayFactoryImpl).inSingletonScope()
    bind<PrayerTimesFactory>(Symbols.Factories.PrayerTimes).to(PrayerTimesFactoryImpl).inSingletonScope()
    bind<IslamicCalendarFactory>(Symbols.Factories.IslamicCalendar).to(IslamicCalendarFactoryImpl).inSingletonScope()
    bind<SchedulerFactory>(Symbols.Factories.Scheduler).to(SchedulerFactoryImpl).inSingletonScope()

    // Repositories
    bind<IslamicMonthRepository>(Symbols.Repositories.IslamicMonth).to(IslamicMonthRepositoryImpl).inSingletonScope()
    bind<CityRepository>(Symbols.Repositories.City).to(CityRepositoryImpl).inSingletonScope()
    bind<DistrictRepository>(Symbols.Repositories.District).to(DistrictRepositoryImpl).inSingletonScope()
    bind<PrayersInDayRepository>(Symbols.Repositories.PrayersInDay).to(PrayersInDayRepositoryImpl).inSingletonScope()
    bind<IslamicCalendarRepository>(Symbols.Repositories.IslamicCalendar).to(IslamicCalendarRepositoryImpl).inSingletonScope()

    // Client
    bind<NamozVaqtiClient>(Symbols.Clients.NamozVaqti).to(NamozVaqtiClientImpl).inSingletonScope()
    bind<AladhanClient>(Symbols.Clients.Aladhan).to(AladhanClientImpl).inSingletonScope()

    // Use cases
    bind<UpdatePrayersPerMonthUseCase>(Symbols.UseCases.UpdatePrayersPerMonth).to(UpdatePrayersPerMonthUseCaseImpl).inSingletonScope()
    bind<UpdateIslamicCalendarUseCase>(Symbols.UseCases.UpdateIslamicCalendar).to(UpdateIslamicCalendarUseCaseImpl).inSingletonScope()
})