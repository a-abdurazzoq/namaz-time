import {GetAllExecuteTimeChatsForSending, GetAllExecuteTimeChatsForSendingUseCase} from "../../abstractions";
import {inject, injectable} from "inversify";
import {Symbols} from "../../../dependencies/symbols";
import {PostForTelegramRepository} from "../../../repositories/abstractions";

@injectable()
export class GetAllExecuteTimeChatsForSendingUseCaseImpl implements GetAllExecuteTimeChatsForSendingUseCase {
    constructor(
        @inject(Symbols.Repositories.PostForTelegram) private PostForTelegramRepository: PostForTelegramRepository
    ) {}

    public async execute(params: GetAllExecuteTimeChatsForSending.Params): Promise<GetAllExecuteTimeChatsForSending.Response> {
        return this.PostForTelegramRepository.getAllLessAndEqualByNextTime(params.date)
    }

}