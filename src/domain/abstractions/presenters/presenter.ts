export interface Presenter<T, R> {
    format(data: T): R
}