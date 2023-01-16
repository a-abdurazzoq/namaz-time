import {Schema, model, Types} from "mongoose"

export interface IMosqueModel {
    name: string,
    address: {
        city_id: Types.ObjectId;
        district_id: Types.ObjectId;
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
            type: Types.ObjectId,
            required: true
        },
        district_id: {
            type: Types.ObjectId
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