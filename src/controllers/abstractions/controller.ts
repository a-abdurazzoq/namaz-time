export interface Controller<R = any> {
    execute(): Promise<R>
}