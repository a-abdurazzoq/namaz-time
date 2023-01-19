import "reflect-metadata"
import 'source-map-support/register'

import * as dotenv from "dotenv"
import path from "path"
import {ApplicationRunnerImpl} from "../infrastructures/application";
import {ContainerImpl} from "../dependencies/container";
import {regularSendingPrayerTimesModule} from "../dependencies/modules";

dotenv.config({path: path.join(__dirname, "../../.env")})

const application = new ApplicationRunnerImpl(
    new ContainerImpl([
        regularSendingPrayerTimesModule
    ])
)


setImmediate(async () => {
    await application.run()
})
