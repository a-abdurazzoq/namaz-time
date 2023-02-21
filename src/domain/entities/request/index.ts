export class Request {
    constructor(
       private id: string,
       private telegramChannelLink: string,
       private telegramUsername: string,
       private cityId: number,
       private districtId: number,
       private createAt: Date,
       private updateAt: Date
    ) {
        this.isTelegramChannelLink(telegramChannelLink)
        this.isTelegramUsername(telegramUsername)
        this.isCityId(cityId)
        this.isDistrictId(districtId)
    }

    public getId(): string {
        return this.id
    }
    public getTelegramChannelLink(): string {
        return this.telegramChannelLink
    }
    public getTelegramUsername(): string {
        return this.telegramUsername
    }
    public getCityId(): number {
        return this.cityId
    }
    public getDistrictId(): number {
        return this.districtId
    }
    public getCreateAt(): Date {
        return this.createAt
    }
    public getUpdateAt(): Date {
        return this.updateAt
    }

    isTelegramChannelLink(telegramChannelLink: string): void | never {
        let regex = /https:\/\/(t\.me|telegram\.me)\/\S{3,}/ig

        if(!regex.test(telegramChannelLink))
            throw new Error("Telegram link is invalid")

        return
    }
    isTelegramUsername(telegramUsername: string): void | never {
        let regex = /@\S{5,26}/gi

        if(!regex.test(telegramUsername))
            throw new Error("Telegram username is invalid")

        return
    }
    isCityId(cityId: number): void | never {
        if(cityId && cityId.constructor !== Number)
            throw new Error("City id is not a number")

        return
    }
    isDistrictId(districtId: number): void | never {
        if(districtId && districtId.constructor !== Number)
            throw new Error("District id is not a number")

        return
    }
}