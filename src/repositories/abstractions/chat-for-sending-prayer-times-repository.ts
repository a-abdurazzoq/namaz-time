import {ChatForSendingPrayerTimes} from "../../domain/entities";

export interface ChatForSendingPrayerTimesRepository {
    getById(id: string): Promise<ChatForSendingPrayerTimes>;

    getAllLessAndEqualByNextTime(date: Date): Promise<ChatForSendingPrayerTimes[]>;
}