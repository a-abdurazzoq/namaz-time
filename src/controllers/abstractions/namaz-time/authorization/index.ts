import {
    LoginAuthorizationUseCaseParams, RegistrationAuthorizationUseCaseParams
} from "../../../../use-cases/abstractions";
import {
    LoginAuthorizationPresenterData
} from "../../../../presenters/abstractions/authorization/login-authorization-presenter";
import {
    RegistrationAuthorizationPresenterData
} from "../../../../presenters/abstractions/authorization/registration-authorization-presenter";

export interface AuthorizationController {
    login(params: AuthorizationController.Login.Params): Promise<AuthorizationController.Login.Response>;
    registration(params: AuthorizationController.Registration.Params): Promise<AuthorizationController.Registration.Response>;
    logout(params: AuthorizationController.Logout.Params): Promise<AuthorizationController.Logout.Response>;
}

export namespace AuthorizationController {
    export namespace Login {
        export type Params = LoginAuthorizationUseCaseParams;
        export type Response = LoginAuthorizationPresenterData.Response;
    }

    export namespace Registration {
        export type Params = RegistrationAuthorizationUseCaseParams;
        export type Response = RegistrationAuthorizationPresenterData.Response;
    }

    export namespace Logout {
        export type Params = LogoutAuthorizationControllerParams;
        export type Response = any;
    }
}

export interface LogoutAuthorizationControllerParams {
    token: string
}