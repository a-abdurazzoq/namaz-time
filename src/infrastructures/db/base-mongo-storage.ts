import {Storage} from "../abstractions/db/storage";
import mongoose from "mongoose";

export class BaseMongoStorageImpl implements Storage {
    constructor(
        private mongodbURI: string
    ) {
        this.isMongodbURI(mongodbURI)
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