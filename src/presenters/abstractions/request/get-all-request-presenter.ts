import {Presenter} from "../index";
import {Request} from "../../../domain/entities/request";

export interface GetAllRequestPresenter extends Presenter<GetAllRequestPresenter.Params, GetAllRequestPresenter.Response> {}

export namespace GetAllRequestPresenter {
    export type Params = Request[]

    export type Response = {
        telegram_channel_link: string;
        telegram_username: string;
        city: {
            id: number;
            name: string;
        }
        district: {
            id: number;
            name: string;
        }
    }[]
}