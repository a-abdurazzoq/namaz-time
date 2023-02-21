export * from "./scheduler-controller"

export * from "./namaz-time/prayer-times/get-today-prayer-times-controller"

export * from "./namaz-time/requests/create-request-for-register-controller"

export interface Controller<T, R> {
    execute(params: T): Promise<R>
}