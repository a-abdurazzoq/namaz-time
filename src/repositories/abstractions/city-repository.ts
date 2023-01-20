import {City} from "../../domain/entities";

export interface CityRepository {
    getById(id: number): Promise<City>;
}