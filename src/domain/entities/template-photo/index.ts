import {TelegramChat} from "../telegram-channel";

export class TemplatePhoto {
    constructor(
        private id: string,
        private fileName: string,
        private telegramChat: TelegramChat,
        private createAt: Date,
        private updateAt: Date
    ) {
        this.isFileName(this.fileName)
        this.isCreateAt(this.createAt)
        this.isUpdateAt(this.updateAt)
    }

    public getId(): string {
        return this.id
    }

    public getFileName(): string {
        return this.fileName
    }

    public getTelegramChat(): TelegramChat {
        return this.telegramChat
    }

    public getCreateAt(): Date {
        return this.createAt
    }

    public getUpdateAt(): Date {
        return this.updateAt
    }


    private isFileName(fileName: string): void {
        if(fileName.constructor !== String) {
            throw new Error("fileName is not string")
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