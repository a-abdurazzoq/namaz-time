export class PrayerTimes {
    constructor(
        private fajr: string,
        private shurooq: string,
        private dhuhr: string,
        private asr: string,
        private maghrib: string,
        private isha: string
    ) {
        this.validateStringTime(fajr)
        this.validateStringTime(shurooq)
        this.validateStringTime(dhuhr)
        this.validateStringTime(asr)
        this.validateStringTime(maghrib)
        this.validateStringTime(isha)
    }

    public getFajr(): string {
        return this.fajr
    }

    public getShurooq(): string {
        return this.shurooq
    }

    public getDhuhr(): string {
        return this.dhuhr
    }

    public getAsr(): string {
        return this.asr
    }

    public getMaghrib(): string {
        return this.maghrib
    }

    public getIsha(): string {
        return this.isha
    }


    private validateStringTime(date: string): void | never {
        let dateRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/

        if(!dateRegex.test(date))
            throw new Error(`${date} is not a valid format time string`)
    }

}