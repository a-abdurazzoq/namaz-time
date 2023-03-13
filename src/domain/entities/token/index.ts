import {User} from "../user";

export class Token {
    constructor(
        private id: string,
        private user: User,
        private token: string,
        private expireIn: number,
        private expireOn: Date,
        private createdAt: Date,
        private updateAt: Date
    ) {
        this.isToken(token)
        this.isCreateAt(createdAt)
        this.isUpdateAt(updateAt)
    }

    public getId(): string {
        return this.id
    }

    public getToken(): string  {
        return this.token
    }

    public getUser(): User  {
        return this.user
    }

    public getExpireIn(): number {
        return this.expireIn
    }
    public getExpireOn(): Date {
        return this.expireOn
    }

    public getCreatedAt(): Date  {
        return this.createdAt
    }

    public getUpdateAt(): Date  {
        return this.updateAt
    }


    private isToken(token: string): void | never {
        if (token.constructor !== String) {
            throw new Error("token is not string")
        }
    }

    private isCreateAt(createAt: Date): void | never {
        if(createAt.constructor !== Date) {
            throw new Error("createAt is not date")
        }
    }

    private isUpdateAt(updateAt: Date): void | never {
        if(updateAt.constructor !== Date) {
            throw new Error("updateAt is not date")
        }
    }
}