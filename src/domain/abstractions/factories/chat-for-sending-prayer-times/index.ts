import {Factory} from "../factory";
import {ChatForSendingPrayerTimes, TelegramChannel, TemplatePhoto} from "../../../entities";

export interface ChatForSendingPrayerTimesDto {
    id: string;
    telegramChannel: TelegramChannel;
    templatePhoto: TemplatePhoto;
    chatId: number;
    timePerDay: number;
    nextTime: Date;
    createAt: Date;
    updateAt: Date;
}

export interface ChatForSendingPrayerTimesFactory extends Factory<ChatForSendingPrayerTimesDto, ChatForSendingPrayerTimes> {}