import {Schema, model} from "mongoose"

export interface ICityModel {
    _id: number,
    name: string,
}

const CitySchema = new Schema({
    _id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

export const CityModel = model<ICityModel>("Cities", CitySchema)