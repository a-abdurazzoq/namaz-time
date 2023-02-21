export * from "./scheduler-controller"
export * from "./namaz-time/prayer-times/get-today-prayer-times-controller"

export interface Controller<T, R> {
    execute(params: T): Promise<R>
}