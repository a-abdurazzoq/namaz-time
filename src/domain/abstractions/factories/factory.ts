export interface Factory<T, R> {
    create(dto: T): R;
}