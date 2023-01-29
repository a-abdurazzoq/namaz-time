import {ChatForSendingPrayerTimes, TemplatePhoto} from "../../domain/entities";

export interface TemplatePhotoRepository {
    getById(id: string): Promise<TemplatePhoto>;
    generatePhotoByChatForSendingPrayerTimes(chatForSendingPrayerTimes: ChatForSendingPrayerTimes): Promise<Buffer>;
}