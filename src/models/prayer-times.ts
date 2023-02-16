import {Schema, model, Types, Document} from "mongoose"

export interface IPrayerTimesModel extends Document {
    islamic_calendar_id: Types.ObjectId;
    prayer_times: {
        fajr: string;
        shurooq: string;
        dhuhr: string;
        asr: string;
        maghrib: string;
        isha: string;
    };
    create_at: Date;
    update_at: Date;
}

const validatePrayerTime = {
    validator(date: string) {
        return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(date);
    },
    message(props: any) {
        return `${props.value} is not a valid phone number!`
    }
}

const PrayerTimesSchema = new Schema({
    islamic_calendar_id: {
        type: Types.ObjectId,
        required: true
    },
    prayer_times: {
        fajr: {
            type: String,
            required: true,
            validate: validatePrayerTime
        },
        shurooq: {
            type: String,
            required: true,
            validate: validatePrayerTime
        },
        dhuhr: {
            type: String,
            required: true,
            validate: validatePrayerTime
        },
        asr: {
            type: String,
            required: true,
            validate: validatePrayerTime
        },
        maghrib: {
            type: String,
            required: true,
            validate: validatePrayerTime
        },
        isha: {
            type: String,
            required: true,
            validate: validatePrayerTime
        }
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

export const PrayerTimesModel = model<IPrayerTimesModel>("prayer-times", PrayerTimesSchema)