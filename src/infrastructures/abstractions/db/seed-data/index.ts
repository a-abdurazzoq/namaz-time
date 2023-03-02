export * from "./module"

export interface SeedData {
    execute(): Promise<any>;
}