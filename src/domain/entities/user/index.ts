export class User {
    constructor(
        private username: string,
        private password: string,
        private fullName: string,
        private phoneNumber: string,
        private createAt: Date,
        private updateAt: Date
    ) {
        this.isUsername(username)
        this.isPassword(password)
        this.isFullName(fullName)
        this.isPhoneNumber(phoneNumber)
        this.isCreateAt(createAt)
        this.isUpdateAt(updateAt)
    }

    public getUsername(): string {
        return this.username
    }

    public getPassword(): string {
        return this.password
    }

    public getFullName(): string {
        return this.fullName
    }

    public getPhoneNumber(): string {
        return this.phoneNumber
    }

    public getCreateAt(): Date {
        return this.createAt
    }

    public getUpdateAt(): Date {
        return this.updateAt
    }

    private isUsername(username: string): void {
        if(username.constructor !== String) {
            throw new Error("username is not string")
        }
    }

    private isPassword(password: string): void {
        if(password.constructor !== String) {
            throw new Error("password is not string")
        }
    }

    private isFullName(fullName: string): void {
        if(fullName.constructor !== String) {
            throw new Error("fullName is not string")
        }
    }

    private isPhoneNumber(phoneNumber: string): void {
        let regexPhoneNumber = /^[0-9]{9}$/

        if(phoneNumber.constructor !== String) {
            throw new Error("phoneNumber is not string")
        }

        if(!regexPhoneNumber.test(phoneNumber)) {
            throw new Error("invalid format phoneNumber")
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