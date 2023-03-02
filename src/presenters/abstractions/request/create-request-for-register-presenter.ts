import {Presenter} from "../index";
import {Request} from "../../../domain/entities/request";

export interface CreateRequestForRegisterPresenter extends Presenter<CreateRequestForRegisterPresenterData.Params, CreateRequestForRegisterPresenterData.Response> {}

export namespace CreateRequestForRegisterPresenterData {
    export type Params = Request

    export interface Response {
        message: string
    }
}