import {Schema, model, Document} from "mongoose"
import {TelegramChatType} from "../domain/entities";

export interface ITelegramChatModel extends Document {
    name: string;
    address: {
        city_id: number;
        district_id: number;
        street: string;
        home: string;
    },
    chat_type: TelegramChatType;
    chat_id: number;
    chat_username: string;
    create_at: Date;
    update_at: Date;
}

const TelegramChatSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        city_id: {
            type: Number,
            required: true
        },
        district_id: {
            type: Number
        },
        street: {
            type: String
        },
        home: {
            type: String
        }
    },
    chat_type: {
        type: Number,
        required: true
    },
    chat_id: {
        type: Number,
        required: true
    },
    chat_username: {
        type: String,
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

export const TelegramChatModel = model<ITelegramChatModel>("telegram-chats", TelegramChatSchema)