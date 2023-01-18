import {Storage} from "../abstractions";
import mongoose from "mongoose";

export class BaseMongoStorageImpl implements Storage {
    private readonly mongodbURI: string

    constructor() {
        this.mongodbURI = String(process.env.MONGODB_URI)
        this.isMongodbURI(this.mongodbURI)
    }

    async open(): Promise<void> {
        await this.connect()
        return
    }

    async close(): Promise<void> {
        await mongoose.disconnect()
        console.log("Приложение успешно отсоединение к базе данных")
        return
    }
    private async connect() {
        await mongoose.connect(this.mongodbURI)
        console.log("Приложение успешно подключено к базе данных")
        return
    }

    private isMongodbURI(mongodbURI: string) {
        let regexp = /^mongodb:\/\//

        if(!regexp.test(mongodbURI))
            throw new Error("Неправильный формат URI Mongodb")
    }
}