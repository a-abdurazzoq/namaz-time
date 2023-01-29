import {Schema, model, Types} from "mongoose"

export interface IChatForSendingPrayerTimesModel {
    _id: Types.ObjectId;
    telegram_channel_id: Types.ObjectId;
    template_photo_id: Types.ObjectId;
    chat_id: number;
    time_per_day: number;
    next_time: Date;
    create_at: Date;
    update_at: Date;
}

const ChatForSendingPrayerTimesSchema = new Schema({
    telegram_channel_id: {
        type: Types.ObjectId,
        required: true
    },
    template_photo_id: {
        type: Types.ObjectId,
        required: true
    },
    chat_id: {
        type: Number,
        required: true
    },
    time_per_day: {
        type: Number,
        required: true
    },
    next_time: {
        type: Date,
        required: true
    },
    is_active: {
        type: Boolean,
        default: true
    },
    create_at: {
        type: Date,
        default: Date.now()
    },
    update_at: {
        type: Date,
        default: Date.now()
    },
})

export const ChatForSendingPrayerTimesModel = model<IChatForSendingPrayerTimesModel>("chats-for-sending-prayer-times", ChatForSendingPrayerTimesSchema)