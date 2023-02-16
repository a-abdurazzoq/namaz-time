import {Schema, model, Types, Document} from "mongoose"

export interface ITelegramChannelModel extends Document {
    name: string;
    mosque_id: Types.ObjectId | null;
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
        default: null
    },
    chat_id: {
        type: Number,
        required: true
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