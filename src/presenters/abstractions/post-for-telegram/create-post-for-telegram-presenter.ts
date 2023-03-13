import {Presenter} from "../index";
import {PostForTelegram} from "../../../domain/entities";

export interface CreatePostForTelegramPresenter extends Presenter<CreatePostForTelegramPresenterData.Params, CreatePostForTelegramPresenterData.Response> {}

export namespace CreatePostForTelegramPresenterData {
    export type Params = PostForTelegram;

    export interface Response {
        message: string;
    }
}