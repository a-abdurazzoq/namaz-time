import {Controller} from "./abstractions";
import {injectable} from "inversify";

@injectable()
export class SendingPrayerTimesController implements Controller {
    async execute(): Promise<any> {
        console.log("Controller executed")
        return
    }
}