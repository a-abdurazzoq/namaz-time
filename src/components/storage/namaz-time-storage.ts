import {BaseMongoStorageImpl} from "../../infrastructures/db";
import {NamazTimeStorage} from "../abstractions/storage";
import {MosqueModel, PrayerModel, TelegramChannelModel, TemplatePhotoModel, UserModel} from "../../models";
import {injectable} from "inversify";

@injectable()
export class NamazTimeStorageImpl extends BaseMongoStorageImpl implements NamazTimeStorage {
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