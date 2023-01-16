import {Schema, model} from "mongoose"

export interface IUserModel {
    username: string;
    password: string;
    full_name: string;
    phone_number: string;
    create_at: Date;
    update_at: Date;
}

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    full_name: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required: true,
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

export const UserModel = model<IUserModel>("users", UserSchema)