import {Schema, model, Types} from "mongoose"

export interface ITelegramChannelModel {
    _id: Types.ObjectId;
    name: string;
    mosque_id: Types.ObjectId;
    chat_id: number;
    create_at: Date;
    update_at: Date;
}

const TelegramChannelSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    mosque_id: {
        type: Types.ObjectId,
        required: true,
    },
    chat_id: {
        type: Number,
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

export const TelegramChannelModel = model<ITelegramChannelModel>("telegram-channels", TelegramChannelSchema)