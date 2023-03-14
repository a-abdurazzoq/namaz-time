import {Schema, model, Types, Document} from "mongoose"

export interface IPostForTelegramModel extends Document {
    telegram_chat_id: Types.ObjectId;
    post_data: {
        template_photo_id: Types.ObjectId;
        chat_id: number;
        description_in_photo: string;
        caption_for_post: string;
    }
    time_per_day: number;
    next_time: Date;
    create_at: Date;
    update_at: Date;
}

const PostForTelegramSchema = new Schema({
    telegram_chat_id: {
        type: Types.ObjectId,
        required: true
    },
    post_data: {
        template_photo_id: {
            type: Types.ObjectId,
            required: true
        },
        chat_id: {
            type: Number,
            required: true
        },
        description_in_photo: {
            type: String,
            default: "",
        },
        caption_for_post: {
            type: String,
            default: "",
        }
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