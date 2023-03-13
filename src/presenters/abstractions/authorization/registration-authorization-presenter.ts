import {Presenter} from "../index";
import {Token} from "../../../domain/entities";

export interface RegistrationAuthorizationPresenter extends Presenter<RegistrationAuthorizationPresenterData.Params, RegistrationAuthorizationPresenterData.Response> {}

export namespace RegistrationAuthorizationPresenterData {
    export type Params = Token

    export interface Response {
        token: string;
        expire_in: number;
        expire_on: string;
    }
}