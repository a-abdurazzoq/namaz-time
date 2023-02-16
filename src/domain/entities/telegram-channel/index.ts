import {Mosque} from "../mosque";

export class TelegramChannel {
    constructor(
        private id: string,
        private name: string,
        private mosque: Mosque | null,
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

    public getMosque(): Mosque | null {
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

    private isMosque(mosque: Mosque | null): never | void {
        if(!(mosque instanceof Mosque) && mosque !== null) {
            throw new Error("mosque is not instanced from Mosque or is not null")
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