import {District} from "../../domain/entities";

export interface DistrictRepository {
    getById(id: number): Promise<District>;
    create(params: CreateDistrictRepositoryParams): Promise<District>;
    deleteAll(): Promise<void>;
}


export interface CreateDistrictRepositoryParams {
    name: string;
    city_id: number;
    id: number
}