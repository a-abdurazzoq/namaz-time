import {Address} from "./address";
import {User} from "../user";

export class Mosque {
    constructor(
        private id: string,
        private name: string,
        private user: User,
        private address: Address,
        private createAt: Date,
        private updateAt: Date
    ) {
        this.isName(name)
        this.isCreateAt(createAt)
        this.isUpdateAt(updateAt)
    }

    getId(): string {
        return this.id
    }

    public getName(): string {
        return this.name
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

    private isName(name: string): void {
        if(name.constructor !== String) {
            throw new Error("name is not string")
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