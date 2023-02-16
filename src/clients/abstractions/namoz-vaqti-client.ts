export interface NamozVaqtiClient {
    getPrayerTimesByMonth(monthNumber: GetPrayerTimesByMonth.Param): Promise<GetPrayerTimesByMonth.Response[]>
}

export namespace GetPrayerTimesByMonth {
    export type Param = number

    export interface Response {
        gregorianDay: number;
        fajr: string;
        shurooq: string;
        dhuhr: string;
        asr: string;
        maghrib: string;
        isha: string;
        islamicDay: number;
    }
}