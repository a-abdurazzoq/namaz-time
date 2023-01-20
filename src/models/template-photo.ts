import {Schema, model, Types} from "mongoose"

export interface ITemplatePhotoModel {
    _id: Types.ObjectId;
    file_name: string;
    user_id: Types.ObjectId;
    create_at: Date;
    update_at: Date;
}

const TemplatePhotoSchema = new Schema({
    file_name: {
        type: String,
        required: true
    },
    user_id: {
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