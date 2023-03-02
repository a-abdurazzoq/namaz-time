import {CreatePostForTelegramUseCaseParams} from "../../../../use-cases/abstractions";

export interface PostForTelegramController {
    create(params: CreatePostForTelegramController.Params): Promise<CreatePostForTelegramController.Response>
}

export namespace CreatePostForTelegramController {
    export interface Params extends CreatePostForTelegramUseCaseParams {}

    export interface Response {
        
    }
}