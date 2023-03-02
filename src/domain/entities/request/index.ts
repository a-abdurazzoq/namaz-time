import {District} from "../district";
import {City} from "../city";

export class Request {
    constructor(
       private id: string,
       private TelegramChatLink: string,
       private telegramUsername: string,
       private city: City,
       private district: District,
       private createAt: Date,
       private updateAt: Date
    ) {
        this.isTelegramChatLink(TelegramChatLink)
        this.isTelegramUsername(telegramUsername)
    }

    public getId(): string {
        return this.id
    }
    public getTelegramChatLink(): string {
        return this.TelegramChatLink
    }
    public getTelegramUsername(): string {
        return this.telegramUsername
    }
    public getCity(): City {
        return this.city
    }
    public getDistrict(): District {
        return this.district
    }
    public getCreateAt(): Date {
        return this.createAt
    }
    public getUpdateAt(): Date {
        return this.updateAt
    }

    private isTelegramChatLink(TelegramChatLink: string): void | never {
        let regex = /https:\/\/(t\.me|telegram\.me)\/\S{3,}/ig

        if(!regex.test(TelegramChatLink))
            throw new Error("Telegram link is invalid")

        return
    }
    private isTelegramUsername(telegramUsername: string): void | never {
        let regex = /@\S{5,26}/gi

        if(!regex.test(telegramUsername))
            throw new Error("Telegram username is invalid")

        return
    }
}