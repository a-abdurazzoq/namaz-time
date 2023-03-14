import {Presenter} from "../index";
import {User} from "../../../domain/entities";

export interface GetMeAuthorizationPresenter extends Presenter<GetMeAuthorizationPresenter.Params, GetMeAuthorizationPresenter.Response> {}

export namespace GetMeAuthorizationPresenter {
    export type Params = User

    export interface Response {
        id: string;
        full_name: string;
    }
}