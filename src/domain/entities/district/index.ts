import {City} from "../city";

export class District {
    constructor(
        private id:  number,
        private city:  City,
        private name: string
    ) {
        this.isId(id)
        this.isName(name)
    }

    public getId(): number {
        return this.id
    }

    public getCity(): City {
        return this.city
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