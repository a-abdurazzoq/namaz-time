import {City} from "../../domain/entities";

export interface CityRepository {
    getById(id: number): Promise<City>;
    create(params: CreateCityRepositoryParams): Promise<City>;
    deleteAll(): Promise<void>;
}

export interface CreateCityRepositoryParams {
    name: string;
    id: number
}