import {IslamicMonth} from "../islamic-month";
import {injectable} from "inversify";

@injectable()
export class IslamicCalendar {
    constructor(
       private id: string,
       private year: number,
       private dayNumber: number,
       private month: IslamicMonth,
       private gregorianDate: Date,
       private createAt: Date,
       private updateAt: Date,
    ) {
        this.isId(id)
        this.isYear(year)
        this.isDayNumber(dayNumber)
        this.isGregorianDate(gregorianDate)
        this.isCreateAt(createAt)
        this.isUpdateAt(updateAt)
    }

    public getId(): string {
        return this.id
    }

    public getYear(): number {
        return this.year
    }

    public getDayNumber(): number {
        return this.dayNumber
    }

    public getMonth(): IslamicMonth {
        return this.month
    }

    public getGregorianDate(): Date {
        return this.gregorianDate
    }

    public getIslamicDateAsText(): string {
        return `${this.getDayNumber()} ${this.getMonth().getName()}‚ ${this.getYear()}`
    }

    public getGregorianDateAsText(): string {
        let date = Intl.DateTimeFormat("uz-Cyrl-UZ",
            {
                dateStyle: "full"
            }
        ).format(this.gregorianDate)

        let dateAsArray: string[] = date.split(", ")
        dateAsArray = dateAsArray.map((t: string) => t.replace(/[а-я]/i, l => l.toUpperCase()))

        return dateAsArray.join("‚ ")
    }

    public getCreateAt(): Date {
        return this.createAt
    }

    public getUpdateAt(): Date {
        return this.updateAt
    }

    private isId(id: string): never | void {
        if(id.constructor !== String)
            throw new Error("id not defined as String")
    }

    private isYear(year: number): never | void {
        if(year.constructor !== Number)
            throw new Error("year not defined as Number")
    }

    private isDayNumber(dayNumber: number): never | void {
        if(dayNumber.constructor !== Number)
            throw new Error("dayNumber not defined as Number")
    }


    private isGregorianDate(gregorianDate: any): void | never {
        if(gregorianDate.constructor !== Date)
            throw new Error("gregorianDate not defined as Date")
    }

    private isCreateAt(createAt: any): void | never {
        if(createAt.constructor !== Date)
            throw new Error("createAt not defined as Date")
    }

    private isUpdateAt(updateAt: any): void | never {
        if(updateAt.constructor !== Date)
            throw new Error("updateAt not defined as Date")
    }

}