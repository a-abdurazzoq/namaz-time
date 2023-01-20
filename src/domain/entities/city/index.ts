export class City {
    constructor(
        private id: number,
        private name: string
    ) {
        this.isId(id)
        this.isName(name)
    }

    public getId(): number {
        return this.id
    }

    public getName(): string {
        return this.name
    }

    private isId(id: number): void {
        if(id.constructor !== Number) {
            throw new Error("id is not number")
        }
    }

    private isName(name: string): void {
        if(name.constructor !== String) {
            throw new Error("name is not string")
        }
    }
}