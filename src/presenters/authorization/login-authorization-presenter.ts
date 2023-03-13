import {injectable} from "inversify";
import {
    LoginAuthorizationPresenter,
    LoginAuthorizationPresenterData
} from "../abstractions/authorization/login-authorization-presenter";


@injectable()
export class LoginAuthorizationPresenterImpl implements LoginAuthorizationPresenter {
    public print(params: LoginAuthorizationPresenterData.Params): LoginAuthorizationPresenterData.Response {
        return {
            token: params.getToken(),
            expire_in: params.getExpireIn(),
            expire_on: params.getExpireOn().toJSON()
        };
    }
}