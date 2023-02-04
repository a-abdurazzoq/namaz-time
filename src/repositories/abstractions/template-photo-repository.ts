import {ChatForSendingPrayerTimes, TemplatePhoto} from "../../domain/entities";

export interface GeneratePhotoByChatForSendingPrayerTimesParams {
    chatForSendingPrayerTimes: ChatForSendingPrayerTimes;
    necessaryDate: Date;
}

export interface TemplatePhotoRepository {
    getById(id: string): Promise<TemplatePhoto>;
    generatePhotoByChatForSendingPrayerTimes(params: GeneratePhotoByChatForSendingPrayerTimesParams): Promise<Buffer>;
}