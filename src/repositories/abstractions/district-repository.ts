import {District} from "../../domain/entities";

export interface DistrictRepository {
    getById(id: number): Promise<District>;
}