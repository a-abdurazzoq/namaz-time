import {HandlerParams, RouterConfig, RouterMethodTypes} from "../abstractions/http/decorators";

export namespace Http {
    export function Guard(key: string, value: any) {
        return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
            if(!descriptor.value?.guard)
                descriptor.value.guard = {}

            descriptor.value.guard[key] = value
        }
    }

    export function Router(path: string) {
        return function (target: any) {
            target.prototype.routers = [] as RouterConfig[]

            let instance = new target()
            let methodNames = Internal.getAllMethods(instance)

            methodNames.forEach((methodName: keyof typeof instance) => {
                let method = instance[methodName]

                if("routerConfig" in method.prototype)
                    target.prototype.routers.push({
                        path: `/${path}`+ (method.prototype.routerConfig.path && `/${method.prototype.routerConfig.path}`),
                        type: method.prototype.routerConfig.type,
                        guard: method.prototype.routerConfig.guard,
                        method: method
                    } as RouterConfig)
            })
        }
    }

    export function Get(path: string = "") {
        return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
            descriptor.value = Internal.handler({
                path: path,
                descriptor: descriptor,
                routerMethod: RouterMethodTypes.GET
            })
        }
    }

    export function Post(path: string = "") {
        return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
            descriptor.value = Internal.handler({
                path: path,
                descriptor: descriptor,
                routerMethod: RouterMethodTypes.POST
            })
        }
    }
}



namespace Internal {
    export function handler(params: HandlerParams) {
        let method = params.descriptor.value

        method.prototype.routerConfig = {
            path: params.path,
            type: params.routerMethod,
            guard: method.guard || {}
        } as RouterConfig

        return method
    }

    export function getAllMethods(obj: Object) {
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