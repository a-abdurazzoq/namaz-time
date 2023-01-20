import {ChatForSendingPrayerTimes} from "../../domain/entities";

export interface ChatForSendingPrayerTimesRepository {
    getById(id: string): Promise<ChatForSendingPrayerTimes>;
}