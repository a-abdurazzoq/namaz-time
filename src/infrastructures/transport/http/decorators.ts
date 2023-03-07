import {Request, Response} from "express";
import {inject, injectable, postConstruct} from "inversify";
import {Logger} from "../../../components/abstractions/logger";
import {Symbols} from "../../../dependencies/symbols";

@injectable()
export class Http {
    private static logger: Logger;

    constructor(
        @inject(Symbols.Infrastructures.Logger) private readonly logger: Logger
    ) {}

    @postConstruct()
    public init(): void {
        Http.logger = this.logger
    }

    static Router(path: string) {
        return function (target: any) {
            target.prototype.routers = [] as RouterConfig[]

            let instance = new target()
            let methodNames = Http.getAllMethods(instance)

            methodNames.forEach((methodName: keyof typeof instance) => {
                let method = instance[methodName]
                target.prototype.routers.push({
                    path: `/${path}`+ (method.prototype.routerConfig.path && `/${method.prototype.routerConfig.path}`),
                    type: method.prototype.routerConfig.type,
                    method: method
                })
            })
        }
    }

    static Get(path: string = "") {
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            let originalMethod = descriptor.value

            let method = Http.handler(originalMethod)

            method.prototype.routerConfig = {
                path: path,
                type: RouterMethodTypes.GET,
            } as RouterConfig

            descriptor.value = method
        }
    }

    static Post(path: string = "") {
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            let originalMethod = descriptor.value

            let method = Http.handler(originalMethod)

            method.prototype.routerConfig = {
                path: path,
                type: RouterMethodTypes.POST,
            } as RouterConfig

            descriptor.value = method
        }
    }

    private static handler(originalMethod: (req: Request) => Promise<any>) {
        return async function (this: Object, req: Request, res: Response) {
            try {
                let result = await originalMethod.call(this, req)

                res.status(200).json({
                    success: true,
                    data: result
                })

                return
            }
            catch (error: any) {
                await Http.logger.print({error: error})

                res.status(500).json({
                    success: false,
                    data: {
                        message: error.message
                    }
                })

                return
            }
        }
    }

    private static getAllMethods(obj: Object) {
        let props: string[] = []

        do {
            const l = Object.getOwnPropertyNames(obj)
                .concat(Object.getOwnPropertySymbols(obj).map(s => s.toString()))
                .sort()
                .filter((p, i, arr) =>
                    typeof obj[p as keyof typeof obj] === 'function' &&  //only the methods
                    p !== 'constructor' &&           //not the constructor
                    (i == 0 || p !== arr[i - 1]) &&  //not overriding in this prototype
                    props.indexOf(p) === -1          //not overridden in a child
                )
            props = props.concat(l)
        }
        while (
            (obj = Object.getPrototypeOf(obj)) &&   //walk-up the prototype chain
            Object.getPrototypeOf(obj)              //not the Object prototype methods (hasOwnProperty, etc...)
            )

        return props
    }
}

/*export function Router(path: string) {
    return function (target: any) {
        target.prototype.routers = [] as RouterConfig[]

        let instance = new target()
        let methodNames = getAllMethods(instance)

        methodNames.forEach((methodName: keyof typeof instance) => {
            let method = instance[methodName]
            target.prototype.routers.push({
                path: `/${path}`+ (method.prototype.routerConfig.path && `/${method.prototype.routerConfig.path}`),
                type: method.prototype.routerConfig.type,
                method: method
            })
        })
    }
}

export const Method = {
    Get(path: string = "") {
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            let originalMethod = descriptor.value

            let method = RequestHandler(originalMethod)

            method.prototype.routerConfig = {
                path: path,
                type: RouterMethodTypes.GET,
            } as RouterConfig

            descriptor.value = method
        }
    },
    Post(path: string = "") {
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            let originalMethod = descriptor.value

            let method = RequestHandler(originalMethod)

            method.prototype.routerConfig = {
                path: path,
                type: RouterMethodTypes.POST,
            } as RouterConfig

            descriptor.value = method
        }
    }
}

function RequestHandler(originalMethod: (req: Request) => Promise<any>) {
     return async function (this: Object, req: Request, res: Response) {
        try {
            let result = await originalMethod.call(this, req)

            res.status(200).json({
                success: true,
                data: result
            })

            return
        }
        catch (error: any) {
            res.status(500).json({
                success: false,
                data: {
                    message: error.message
                }
            })

            return
        }
    }
}

function getAllMethods(obj: Object) {
    let props: string[] = []

    do {
        const l = Object.getOwnPropertyNames(obj)
            .concat(Object.getOwnPropertySymbols(obj).map(s => s.toString()))
            .sort()
            .filter((p, i, arr) =>
                typeof obj[p as keyof typeof obj] === 'function' &&  //only the methods
                p !== 'constructor' &&           //not the constructor
                (i == 0 || p !== arr[i - 1]) &&  //not overriding in this prototype
                props.indexOf(p) === -1          //not overridden in a child
            )
        props = props.concat(l)
    }
    while (
        (obj = Object.getPrototypeOf(obj)) &&   //walk-up the prototype chain
        Object.getPrototypeOf(obj)              //not the Object prototype methods (hasOwnProperty, etc...)
        )

    return props
}*/

export enum RouterMethodTypes {
    GET = "GET",
    POST = "POST"
}

export interface RouterConfig {
    path: string;
    type: RouterMethodTypes;
    method: (req: Request, res: Response) => Promise<any>
}
