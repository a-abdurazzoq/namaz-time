import {Mosque} from "../mosque";

export class TelegramChannel {
    constructor(
        private id: string,
        private name: string,
        private mosque: Mosque,
        private chatId: number,
        private createAt: Date,
        private updateAt: Date
    ) {
        this.isName(this.name)
        this.isChatId(this.chatId)
        this.isCreateAt(this.createAt)
        this.isUpdateAt(this.updateAt)
    }

    public getId(): string {
        return this.id
    }


    public getName(): string {
        return this.name
    }

    public getMosque(): Mosque {
        return this.mosque
    }

    public getChatId(): number {
        return this.chatId
    }

    public getCreateAt(): Date {
        return this.createAt
    }

    public getUpdateAt(): Date {
        return this.updateAt
    }


    private isName(name: string): void {
        if(name.constructor !== String) {
            throw new Error("name is not string")
        }
    }

    private isChatId(chatId: number): void {
        if(chatId.constructor !== Number) {
            throw new Error("chatId is not number")
        }
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