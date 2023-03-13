import "reflect-metadata"
import 'source-map-support/register'

import * as dotenv from "dotenv"
import path from "path"
import {ApplicationRunnerImpl} from "../../infrastructures/application";
import {ContainerImpl} from "../../dependencies/container";
import {namazTimeModule} from "../../dependencies/modules";

dotenv.config({path: path.join(__dirname, "../../../.env")})

const container = new ContainerImpl([
    namazTimeModule
])

const application = new ApplicationRunnerImpl(container)


setImmediate(async () => {
    await application.run()
})
