import {injectable} from "inversify";


@injectable()
export class IslamicMonth {
    constructor(
        private id: string,
        private number: number,
        private name: string,
    ) {
        this.isId(id)
        this.isNumber(number)
        this.isName(name)
    }

    public getId(): string {
        return this.id
    }

    public getNumber(): number {
        return this.number
    }

    public getName(): string {
        return this.name
    }

    private isId(id: string): void | never {
        if(id.constructor !== String)
            throw new Error("id is not defined as String")

    }
    private isNumber(number: number): void | never {
        if(number.constructor !== Number)
            throw new Error("number is not defined as Number")

    }
    private isName(name: string): void | never {
        if(name.constructor !== String)
            throw new Error("name is not defined as String")

    }
}