export class City {
    constructor(
        private id: string,
        private name: string
    ) {
        this.isId(id)
        this.isName(name)
    }

    public getId(): string {
        return this.id
    }

    public getName(): string {
        return this.name
    }

    private isId(id: string): void {
        if(id.constructor !== String) {
            throw new Error("id is not string")
        }
    }

    private isName(name: string): void {
        if(name.constructor !== String) {
            throw new Error("name is not string")
        }
    }
}