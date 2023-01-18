import {Storage} from "../../../infrastructures/abstractions";
import {MosqueModel, PrayerModel, TelegramChannelModel, TemplatePhotoModel, UserModel} from "../../../models";

export interface NamazTimeStorage extends Storage {
    getMosqueModel(): typeof MosqueModel;
    getPrayerModel(): typeof PrayerModel;
    getTelegramChannelModel(): typeof TelegramChannelModel;
    getTemplatePhotoModel(): typeof TemplatePhotoModel;
    getUserModel(): typeof UserModel;
}