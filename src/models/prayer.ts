import {Schema, model} from "mongoose"

export interface IPrayerModel {
    name: string;
    time: Date;
    create_at: Date;
    update_at: Date;
}

const PrayerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    time: {
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

export const PrayerModel = model<IPrayerModel>("prayers", PrayerSchema)