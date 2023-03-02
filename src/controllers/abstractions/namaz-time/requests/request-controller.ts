import {CreateRequestForRegisterPresenterData} from "../../../../presenters/abstractions/request/create-request-for-register-presenter";

export interface RequestController {
    createForRegister(params: CreateRequestForRegister.Params): Promise<CreateRequestForRegister.Response>
}

export namespace CreateRequestForRegister {
    export interface Params {
        TelegramChatLink: string;
        telegramUsername: string;
        cityId: number;
        districtId: number;
    }

    export type Response = CreateRequestForRegisterPresenterData.Response
}