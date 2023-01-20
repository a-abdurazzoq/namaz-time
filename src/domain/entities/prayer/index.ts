export class Prayer {
    constructor(
        private id: string,
        private name: string,
        private time: Date,
        private createAt: Date,
        private updateAt: Date
    ) {
        this.isName(name)
        this.isTime(time)
        this.isCreateAt(createAt)
        this.isUpdateAt(updateAt)
    }

    public getName(): string {
        return this.name
    }
    public getTime(): Date {
        return this.time
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

    private isTime(time: Date): void {
        if(time.constructor !== Date) {
            throw new Error("time is not date")
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