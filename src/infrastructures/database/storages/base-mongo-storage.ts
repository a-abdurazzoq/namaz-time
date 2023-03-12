import {Storage} from "../../abstractions";
import mongoose from "mongoose";
import {inject, injectable} from "inversify";
import {Logger} from "../../../components/abstractions/logger";
import {Symbols} from "../../../dependencies/symbols";

@injectable()
export class BaseMongoStorageImpl implements Storage {
    private readonly mongodbURI: string

    constructor(
        @inject<Logger>(Symbols.Infrastructures.Logger) private logger: Logger
    ) {
        this.mongodbURI = String(process.env.MONGODB_URI)
        this.isMongodbURI(this.mongodbURI)
    }

    public async open(): Promise<void> {
        this.configuration()
        await this.connect()
        return
    }

    public async close(): Promise<void> {
        await mongoose.disconnect()
        await this.logger.print({alert: "Приложение успешно отсоединение к базе данных"})
        return
    }

    private async connect() {
        await mongoose.connect(this.mongodbURI)
        await this.logger.print({info: "Приложение успешно подключено к базе данных"})
        return
    }

    private configuration() {
        mongoose.set("strictQuery", false)
    }

    private isMongodbURI(mongodbURI: string) {
        let regexp = /^mongodb:\/\//

        if(!regexp.test(mongodbURI))
            throw new Error("Неправильный формат URI Mongodb")
    }
}