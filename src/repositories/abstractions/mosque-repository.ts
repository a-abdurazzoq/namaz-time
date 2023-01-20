import {Mosque} from "../../domain/entities";

export interface MosqueRepository {
    getById(id: string): Promise<Mosque>;
}