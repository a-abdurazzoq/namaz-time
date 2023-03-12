import "reflect-metadata"
import 'source-map-support/register'

import * as dotenv from "dotenv"
import path from "path"
import {ApplicationRunnerImpl} from "../../infrastructures/application";
import {ContainerImpl} from "../../dependencies/container";
import {namazTimeModule} from "../../dependencies/modules";
import {Symbols} from "../../dependencies/symbols";

dotenv.config({path: path.join(__dirname, "../../../.env")})

const container = new ContainerImpl([
    namazTimeModule
])
container.get(Symbols.Infrastructures.Http.Decorator)
const application = new ApplicationRunnerImpl(container)


setImmediate(async () => {
    await application.run()
})
