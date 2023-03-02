import {Schema, model, Document} from "mongoose"

export interface IRequestModel extends Document {
    telegram_channel_link: string;
    telegram_username: string;
    district_id: number;
    city_id: number;
    create_at: Date;
    update_at: Date;
}

const RequestSchema = new Schema<IRequestModel>({
    telegram_channel_link: {
        type: String,
        required: true
    },
    telegram_username: {
        type: String,
        required: true
    },
    district_id: {
        type: Number,
        required: true
    },
    city_id: {
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

export const RequestModel = model<IRequestModel>("Requests", RequestSchema)