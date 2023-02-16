import {GetAllExecuteTimeChatsForSending, GetAllExecuteTimeChatsForSendingUseCase} from "../../abstractions";
import {inject, injectable} from "inversify";
import {Symbols} from "../../../dependencies/symbols";
import {ChatForSendingPrayerTimesRepository} from "../../../repositories/abstractions";

@injectable()
export class GetAllExecuteTimeChatsForSendingUseCaseImpl implements GetAllExecuteTimeChatsForSendingUseCase {
    constructor(
        @inject(Symbols.Repositories.ChatForSendingPrayerTimes) private chatForSendingPrayerTimesRepository: ChatForSendingPrayerTimesRepository
    ) {}

    public async execute(params: GetAllExecuteTimeChatsForSending.Params): Promise<GetAllExecuteTimeChatsForSending.Response> {
        return this.chatForSendingPrayerTimesRepository.getAllLessAndEqualByNextTime(params.date)
    }

}