import {
    CreateRequestForRegisterPresenter,
    CreateRequestForRegisterPresenterData
} from "../abstractions/request/create-request-for-register-presenter";

export class CreateRequestForRegisterPresenterImpl implements CreateRequestForRegisterPresenter {
    public print(params: CreateRequestForRegisterPresenterData.Params): CreateRequestForRegisterPresenterData.Response {
        return {
            message: "Ваш(а) заявка принята"
        }
    }

}