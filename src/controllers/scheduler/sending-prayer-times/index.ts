import {SchedulerController} from "../../abstractions";
import {inject, injectable} from "inversify";
import {Symbols} from "../../../dependencies/symbols";
import {
    GetAllExecuteTimeChatsForSendingUseCase,
    MassSendPrayerTimesToTelegramChatsUseCase
} from "../../../use-cases/abstractions";

@injectable()
export class SendingPrayerTimesController implements SchedulerController {
    constructor(
        @inject(Symbols.UseCases.GetAllExecuteTimeChatsForSending) private getAllExecuteTimeChatsForSendingUseCase: GetAllExecuteTimeChatsForSendingUseCase,
        @inject(Symbols.UseCases.MassSendPrayerTimesToTelegramChats) private massSendPrayerTimesToTelegramChats: MassSendPrayerTimesToTelegramChatsUseCase
    ) {}

    public async execute(): Promise<any> {
        const chatsForSendingPrayerTimes = await this.getAllExecuteTimeChatsForSendingUseCase.execute({
            date: this.getDate()
        })
        return this.massSendPrayerTimesToTelegramChats.execute(chatsForSendingPrayerTimes)
    }

    private getDate(): Date {
        let date = new Date();
        date.setDate(date.getDate()+1);
        date.setHours(0,0,0,0)

        return date
    }
}