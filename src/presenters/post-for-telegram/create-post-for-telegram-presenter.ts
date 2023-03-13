import {
    CreatePostForTelegramPresenterData,
    CreatePostForTelegramPresenter
} from "../abstractions/post-for-telegram/create-post-for-telegram-presenter";
import {injectable} from "inversify";

@injectable()
export class CreatePostForTelegramPresenterImpl implements CreatePostForTelegramPresenter {
    print(params: CreatePostForTelegramPresenterData.Params): CreatePostForTelegramPresenterData.Response {
        return {
            message: "Ваш(а) пост запланирован"
        }
    }

}