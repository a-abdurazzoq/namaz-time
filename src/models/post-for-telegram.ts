import {Schema, model, Types, Document} from "mongoose"

export interface IPostForTelegramModel extends Document {
    telegram_channel_id: Types.ObjectId;
    template_photo_id: Types.ObjectId;
    chat_id: number;
    time_per_day: number;
    next_time: Date;
    create_at: Date;
    update_at: Date;
}

const PostForTelegramSchema = new Schema({
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

export const PostForTelegramModel = model<IPostForTelegramModel>("post-for-telegram", PostForTelegramSchema)