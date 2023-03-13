import {injectable} from "inversify";
import {
    RegistrationAuthorizationPresenter,
    RegistrationAuthorizationPresenterData
} from "../abstractions/authorization/registration-authorization-presenter";


@injectable()
export class RegistrationAuthorizationPresenterImpl implements RegistrationAuthorizationPresenter {
    public print(params: RegistrationAuthorizationPresenterData.Params): RegistrationAuthorizationPresenterData.Response {
        return {
            token: params.getToken(),
            expire_in: params.getExpireIn(),
            expire_on: params.getExpireOn().toJSON()
        }
    }
}