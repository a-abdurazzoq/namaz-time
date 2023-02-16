import {Schema, model, Document} from "mongoose"

export interface IIslamicMonthModel extends Document {
    number: number,
    name: string,
}

const IslamicMonthSchema = new Schema(
    {
        number: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    {
        versionKey: false
    }
)

export const IslamicMonthModel = model<IIslamicMonthModel>("islamic-months", IslamicMonthSchema)