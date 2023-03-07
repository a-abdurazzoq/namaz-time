import {
    CreateRequestForRegisterPresenter,
    CreateRequestForRegisterPresenterData
} from "../abstractions/request/create-request-for-register-presenter";
import {injectable} from "inversify";

@injectable()
export class CreateRequestForRegisterPresenterImpl implements CreateRequestForRegisterPresenter {
    public print(params: CreateRequestForRegisterPresenterData.Params): CreateRequestForRegisterPresenterData.Response {
        return {
            message: "Ваш(а) заявка принята"
        }
    }

}