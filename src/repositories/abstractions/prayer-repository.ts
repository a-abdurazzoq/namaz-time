import {Prayer} from "../../domain/entities";

export interface PrayerRepository {
    getById(id: string): Promise<Prayer>;
}