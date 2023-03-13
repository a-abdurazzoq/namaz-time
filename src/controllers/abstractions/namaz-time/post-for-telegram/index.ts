import {CreatePostForTelegramUseCaseParams} from "../../../../use-cases/abstractions";
import {
    CreateRequestForRegisterPresenterData
} from "../../../../presenters/abstractions/request/create-request-for-register-presenter";

export interface PostForTelegramController {
    create(params: CreatePostForTelegramController.Params): Promise<CreatePostForTelegramController.Response>
}

export namespace CreatePostForTelegramController {
    export interface Params extends CreatePostForTelegramUseCaseParams {}

    export type Response = CreateRequestForRegisterPresenterData.Response
}