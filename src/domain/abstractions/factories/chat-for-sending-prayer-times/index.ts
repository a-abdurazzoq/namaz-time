import {Factory} from "../factory";
import {ChatForSendingPrayerTimes, TelegramChannel} from "../../../entities";

export interface ChatForSendingPrayerTimesDto {
    id: string;
    telegramChannel: TelegramChannel;
    chatId: number;
    timePerDay: number;
    nextTime: Date;
    createAt: Date;
    updateAt: Date;
}

export interface ChatForSendingPrayerTimesFactory extends Factory<ChatForSendingPrayerTimesDto, ChatForSendingPrayerTimes> {}