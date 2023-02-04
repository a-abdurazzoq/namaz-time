import {Schema, model, Types, Document} from "mongoose"

export interface IMosqueModel extends Document {
    name: string,
    address: {
        city_id: number;
        district_id: number;
        street: string;
        home: string;
    },
    user_id: Types.ObjectId;
    create_at: Date;
    update_at: Date;
}

const MosqueSchema = new Schema({
    name: {
        type: String,
        required: true
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
        },
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

export const MosqueModel = model<IMosqueModel>("mosques", MosqueSchema)