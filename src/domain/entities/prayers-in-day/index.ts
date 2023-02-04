import {PrayerTimes} from "./prayer-times";
import {IslamicCalendar} from "../islamic-calendar";

export class PrayersInDay {
    constructor(
        private id: string,
        private islamicCalendar: IslamicCalendar,
        private prayerTimes: PrayerTimes,
        private createAt: Date,
        private updateAt: Date
    ) {
        this.isCreateAt(createAt)
        this.isUpdateAt(updateAt)
    }

    public getId(): string {
        return this.id
    }

    public getIslamicCalendar(): IslamicCalendar {
        return this.islamicCalendar
    }

    public getPrayerTimes(): PrayerTimes {
        return this.prayerTimes
    }

    public getCreateAt(): Date {
        return this.createAt
    }

    public getUpdateAt(): Date {
        return this.updateAt
    }


    private isCreateAt(createAt: Date): void {
        if(createAt.constructor !== Date) {
            throw new Error("createAt is not date")
        }
    }

    private isUpdateAt(updateAt: Date): void {
        if(updateAt.constructor !== Date) {
            throw new Error("updateAt is not date")
        }
    }

}