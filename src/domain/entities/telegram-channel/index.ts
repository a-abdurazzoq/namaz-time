import {Address} from "./address";

export enum TelegramChatType {
    UNKNOWN = -1,
    PERSONAL = 0,
    GROUP = 1,
    SUPERGROUP = 2,
    CHANNEL = 3,
}

export class TelegramChat {
    constructor(
        private id: string,
        private name: string,
        private address: Address,
        private chatId: number,
        private chatUsername: string,
        private chatType: TelegramChatType,
        private createAt: Date,
        private updateAt: Date
    ) {
        this.isName(this.name)
        this.isChatId(this.chatId)
        this.isChatUsername(this.chatUsername)
        this.isChatType(this.chatId)
        this.isCreateAt(this.createAt)
        this.isUpdateAt(this.updateAt)
    }

    public getId(): string {
        return this.id
    }


    public getName(): string {
        return this.name
    }

    public getAddress(): Address {
        return this.address
    }

    public getChatType(): number {
        return this.chatType
    }

    public getChatId(): number {
        return this.chatId
    }

    public getChatUsername(): string {
        return this.chatUsername
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

    private isChatUsername(name: string): void {
        if(name.constructor !== String) {
            throw new Error("chatUsername is not string")
        }
    }

    private isChatType(chatType: number): void {
        if(chatType.constructor !== Number) {
            throw new Error("chatId is not number")
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