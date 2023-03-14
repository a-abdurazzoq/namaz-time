import {TelegramChat} from "../telegram-channel";

export class TemplatePhoto {
    constructor(
        private id: string,
        private dirName: string,
        private telegramChat: TelegramChat,
        private createAt: Date,
        private updateAt: Date
    ) {
        this.isDirName(this.dirName)
        this.isCreateAt(this.createAt)
        this.isUpdateAt(this.updateAt)
    }

    public getId(): string {
        return this.id
    }

    public getDirName(): string {
        return this.dirName
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


    private isDirName(dirName: string): void {
        if(dirName.constructor !== String) {
            throw new Error("dir name is not string")
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