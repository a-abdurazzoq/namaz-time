import {injectable} from "inversify";

import {
    CreateRequestForRegisterPresenter,
    CreateRequestForRegisterPresenterData
} from "../abstractions";

@injectable()
export class CreateRequestForRegisterPresenterImpl implements CreateRequestForRegisterPresenter {
    public print(params: CreateRequestForRegisterPresenterData.Params): CreateRequestForRegisterPresenterData.Response {
        return {
            message: "Ваш(а) заявка принята"
        }
    }

}