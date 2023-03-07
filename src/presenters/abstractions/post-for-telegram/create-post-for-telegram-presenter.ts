import {Presenter} from "../index";
import {PostForTelegram} from "../../../domain/entities";

export interface CreatePostForTelegramPresenter extends Presenter<CreatePostForTelegram.Params, CreatePostForTelegram.Response> {}

export namespace CreatePostForTelegram {
    export type Params = PostForTelegram;

    export interface Response {
        message: string;
    }
}