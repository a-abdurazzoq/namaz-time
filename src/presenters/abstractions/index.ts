export interface Presenter<T, R> {
    print(params: T): R
}