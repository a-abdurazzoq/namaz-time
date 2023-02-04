import {Schema, model, Document} from "mongoose"

export interface IDistrictModel extends Document {
    _id: number,
    name: string,
}

const DistrictSchema = new Schema({
    _id: {
      type: Number,
      required: true
    },
    name: {
        type: String,
        required: true
    }
})

export const DistrictModel = model<IDistrictModel>("Districts", DistrictSchema)