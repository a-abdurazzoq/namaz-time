import {
    LoginAuthorizationUseCaseParams, RegistrationAuthorizationUseCaseParams, GetMeAuthorizationUseCase
} from "../../../../use-cases/abstractions";
import {
    LoginAuthorizationPresenterData, RegistrationAuthorizationPresenterData, GetMeAuthorizationPresenter
} from "../../../../presenters/abstractions";

export interface AuthorizationController {
    getMe(params: AuthorizationController.GetMe.Params): Promise<AuthorizationController.GetMe.Response>;
    login(params: AuthorizationController.Login.Params): Promise<AuthorizationController.Login.Response>;
    registration(params: AuthorizationController.Registration.Params): Promise<AuthorizationController.Registration.Response>;
    logout(params: AuthorizationController.Logout.Params): Promise<AuthorizationController.Logout.Response>;
}

export namespace AuthorizationController {
    export namespace GetMe {
        export type Params = GetMeAuthorizationUseCase.Params;
        export type Response = GetMeAuthorizationPresenter.Response;
    }

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