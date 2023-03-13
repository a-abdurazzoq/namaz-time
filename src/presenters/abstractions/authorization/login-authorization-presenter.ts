import {Presenter} from "../index";
import {Token} from "../../../domain/entities";

export interface LoginAuthorizationPresenter extends Presenter<LoginAuthorizationPresenterData.Params, LoginAuthorizationPresenterData.Response> {}

export namespace LoginAuthorizationPresenterData {
    export type Params = Token

    export interface Response {
        token: string;
        expire_in: number;
        expire_on: string;
    }
}