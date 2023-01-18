import {BaseMongoStorageImpl} from "../../infrastructures/db";
import {MosqueModel, PrayerModel, TelegramChannelModel, TemplatePhotoModel, UserModel} from "../../models";
import {RegularSendingPrayerTimesStorage} from "../abstractions/storage/regular-sending-prayer-times-storage";
import {injectable} from "inversify";

@injectable()
export class RegularSendingPrayerTimesStorageImpl extends BaseMongoStorageImpl implements RegularSendingPrayerTimesStorage {
    getMosqueModel(): typeof MosqueModel {
        return MosqueModel;
    }

    getPrayerModel(): typeof PrayerModel {
        return PrayerModel;
    }

    getTelegramChannelModel(): typeof TelegramChannelModel {
        return TelegramChannelModel;
    }

    getTemplatePhotoModel(): typeof TemplatePhotoModel {
        return TemplatePhotoModel;
    }

    getUserModel(): typeof UserModel {
        return UserModel;
    }

}