export interface AladhanClient {
    getIslamicCalendarByMonth(params: GetIslamicCalendarByMonth.Params): Promise<GetIslamicCalendarByMonth.Data>
}

export namespace GetIslamicCalendarByMonth {
    export interface Params {
        month: number;
        year: number;
    }

    export interface Response {
        code: number;
        status: string;
        data: Data;
    }

    export type Data = Array<{
        hijri: {
            date: string,
            format: string,
            day: string,
            weekday: {
                en: string,
                ar: string
            },
            month: {
                number: number,
                en: string,
                ar: string
            },
            year: string,
            designation: {
                abbreviated: string,
                expanded: string
            }
        },
        gregorian: {
            date: string,
            format: string,
            day: string,
            weekday: {
                en: string
            },
            month: {
                number: number,
                en: string
            },
            year: string,
            designation: {
                abbreviated: string,
                expanded: string
            }
        }
    }>
}