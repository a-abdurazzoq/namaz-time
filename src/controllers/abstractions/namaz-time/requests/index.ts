import {CreateRequestForRegisterPresenterData} from "../../../../presenters/abstractions";
import {GetAllRequestPresenter} from "../../../../presenters/abstractions/request/get-all-request-presenter";

export interface RequestController {
    createForRegister(params: RequestController.CreateForRegister.Params): Promise<RequestController.CreateForRegister.Response>
    getAll(): Promise<RequestController.GetAll.Response>
}

export namespace RequestController {
    export namespace CreateForRegister {
        export interface Params {
            TelegramChatLink: string;
            telegramUsername: string;
            cityId: number;
            districtId: number;
        }

        export type Response = CreateRequestForRegisterPresenterData.Response
    }

    export namespace GetAll {
        export type Response = GetAllRequestPresenter.Response
    }
}

