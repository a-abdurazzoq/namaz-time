import {User} from "../user";

export class TemplatePhoto {
    constructor(
        private id: string,
        private fileName: string,
        private user: User,
        private createAt: Date,
        private updateAt: Date
    ) {
        this.isFileName(this.fileName)
        this.isCreateAt(this.createAt)
        this.isUpdateAt(this.updateAt)
    }

    public getFileName(): string {
        return this.fileName
    }

    public getUser(): User {
        return this.user
    }

    public getCreateAt(): Date {
        return this.createAt
    }

    public getUpdateAt(): Date {
        return this.updateAt
    }

    private isFileName(fileName: string): void {
        if(fileName.constructor !== Date) {
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