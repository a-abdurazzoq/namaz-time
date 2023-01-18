import {Storage} from "../abstractions";
import mongoose from "mongoose";

export class BaseMongoStorageImpl implements Storage {
    private readonly mongodbURI: string

    constructor() {
        this.mongodbURI = String(process.env.MONGODB_URI)
        this.isMongodbURI(this.mongodbURI)
    }

    async open(): Promise<void> {
        await this.init()
        return
    }

    async close(): Promise<void> {
        await mongoose.disconnect()
        return
    }
    private async init() {
        await mongoose.connect(this.mongodbURI)
    }

    private isMongodbURI(mongodbURI: string) {
        if(!mongodbURI || mongodbURI?.constructor !== String)
            throw new Error("Не указанно URI база данных")
    }
}