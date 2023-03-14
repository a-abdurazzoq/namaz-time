import {RouterBase} from "../../abstractions/http/routers";
import {inject, injectable} from "inversify";
import {Symbols} from "../../../../dependencies/symbols";
import {PrayerTimesController} from "../../../../controllers/abstractions";
import {GetPrayerTimes} from "../../../../presenters/abstractions";
import {Http} from "../decorators";

@injectable()
@Http.Router("prayer-times")
export class PrayerTimesRouterImpl implements RouterBase {
    constructor(
        @inject(Symbols.Controllers.PrayerTimes) private readonly prayerTimesController: PrayerTimesController
    ) {}

    @Http.Get()
    private async getToday(): Promise<GetPrayerTimes.Response> {
        return await this.prayerTimesController.getTodayPrayerTimes()
    }
}