import {IslamicMonth} from "../../domain/entities";



export interface IslamicMonthRepository {
    getByNumber(monthNumber: number): Promise<IslamicMonth>
    
    create(params: CreateIslamicMonthRepositoryParams): Promise<IslamicMonth>

    deleteAll(): Promise<void>
}

export interface CreateIslamicMonthRepositoryParams {
    name: string;
    number: number;
}