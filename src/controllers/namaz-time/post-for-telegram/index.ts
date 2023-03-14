import {inject, injectable} from "inversify";
import {
    CreatePostForTelegramController,
    PostForTelegramController
} from "../../abstractions";
import {Symbols} from "../../../dependencies/symbols";
import {CreatePostForTelegramUseCase} from "../../../use-cases/abstractions";
import {
    CreatePostForTelegramPresenter
} from "../../../presenters/abstractions";


@injectable()
export class PostForTelegramControllerImpl implements PostForTelegramController {
    constructor(
        @inject(Symbols.UseCases.PostForTelegram.Create) private readonly createPostForTelegramUseCase: CreatePostForTelegramUseCase,
        @inject(Symbols.Presenters.PostForTelegram.Create) private readonly createPostForTelegramPresenter: CreatePostForTelegramPresenter
    ) {
    }

    public async create(params: CreatePostForTelegramController.Params): Promise<CreatePostForTelegramController.Response> {
        const postForTelegram = await this.createPostForTelegramUseCase.execute(params)

        return this.createPostForTelegramPresenter.print(postForTelegram)
    }

}