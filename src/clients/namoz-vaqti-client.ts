import axios from "axios";

import {GetPrayerTimesByMonth, NamozVaqtiClient} from "./abstractions";
import {inject, injectable} from "inversify";
import {Symbols} from "../dependencies/symbols";
import {HtmlTableToJsonService} from "../services/abstractions";

interface PrayerTimeFromNamozVaqti {
    Kun: string;
    Bomdod: string;
    Quyosh: string;
    Peshin: string;
    Asr: string;
    Shom: string;
    Xufton: string;
    Qamar: string;
}

@injectable()
export class NamozVaqtiClientImpl implements NamozVaqtiClient {
    constructor(
        @inject(Symbols.Services.HtmlTableToJson) private htmlTableToJsonService: HtmlTableToJsonService
    ) {}

    public async getPrayerTimesByMonth(monthNumber: GetPrayerTimesByMonth.Param): Promise<GetPrayerTimesByMonth.Response[]> {
        const responsePrayerTimes = await axios.get<string>(`https://namozvaqti.uz/oylik/${monthNumber}/toshkent`)

        const prayerTimes = this.htmlParserOfPrayerTimes(responsePrayerTimes.data)

        return prayerTimes.map<GetPrayerTimesByMonth.Response>(prayers => ({
            fajr: prayers.Bomdod,
            shurooq: prayers.Quyosh,
            dhuhr: prayers.Peshin,
            asr: prayers.Asr,
            maghrib: prayers.Shom,
            isha: prayers.Xufton,
            islamicDay: Number(prayers.Qamar.replace(/\D/g, "")),
            gregorianDay: Number(prayers.Kun.replace(/\D/g, ""))
        }))

    }

    private htmlParserOfPrayerTimes(html: string): PrayerTimeFromNamozVaqti[] {
        return this.htmlTableToJsonService.parseJSON<PrayerTimeFromNamozVaqti[]>(html)
    }

}