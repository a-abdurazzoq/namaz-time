import {Controller} from "../../index";

export interface CreateRequestForRegisterController extends Controller<CreateRequestForRegister.Params, CreateRequestForRegister.Response> {}

export namespace CreateRequestForRegister {
    export interface Params {
        telegramChannelLink: string;
        telegramUsername: string;
        cityId: number;
        districtId: number;
    }

    export type Response = any
}