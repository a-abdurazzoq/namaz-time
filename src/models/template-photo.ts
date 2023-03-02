import {Schema, model, Types, Document} from "mongoose"

export interface ITemplatePhotoModel extends Document {
    file_name: string;
    telegram_chat_id: Types.ObjectId;
    create_at: Date;
    update_at: Date;
}

const TemplatePhotoSchema = new Schema({
    file_name: {
        type: String,
        required: true
    },
    telegram_chat_id: {
        type: Types.ObjectId,
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

export const TemplatePhotoModel = model<ITemplatePhotoModel>("template-photos", TemplatePhotoSchema)