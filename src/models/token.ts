import {Schema, model, Document, Types} from "mongoose"

export interface ITokenModel extends Document {
    user_id: Types.ObjectId;
    token: string;
    expire_in: number;
    expire_on: Date;
    create_at: Date;
    update_at: Date;
}

const TokenSchema = new Schema({
    user_id: {
        type: Types.ObjectId,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    expire_in: {
        type: Number,
        required: true
    },
    expire_on: {
        type: Date,
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

export const TokenModel = model<ITokenModel>("tokens", TokenSchema)