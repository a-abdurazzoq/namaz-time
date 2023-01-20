import {Factory} from "../factory";
import {ChatForSendingPrayerTimes} from "../../../entities";

export interface ChatForSendingPrayerTimesDto {
    id: string;
    telegramChannelId: string;
    chatId: number;
    timePerDay: number;
    nextTime: Date;
    createAt: Date;
    updateAt: Date;
}

export interface ChatForSendingPrayerTimesFactory extends Factory<ChatForSendingPrayerTimesDto, ChatForSendingPrayerTimes> {}