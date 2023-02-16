import {Schema, model, Document} from "mongoose"

export interface IIslamicCalendarModel extends Document {
    year: number,
    day_number: number,
    month_number: number,
    gregorian_date: Date,
    create_at: Date,
    update_at: Date,
}

const IslamicCalendarSchema = new Schema({
    year: {
        type: Number,
        required: true
    },
    day_number: {
        type: Number,
        required: true
    },
    month_number: {
        type: Number,
        required: true
    },
    gregorian_date: {
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
    }
})

export const IslamicCalendarModel = model<IIslamicCalendarModel>("islamic-calendars", IslamicCalendarSchema)