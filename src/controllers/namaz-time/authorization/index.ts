import {inject, injectable} from "inversify";
import {
    AuthorizationController,
} from "../../abstractions";
import {
    LoginAuthorizationUseCase,
    RegistrationAuthorizationUseCase,
} from "../../../use-cases/abstractions";
import {Symbols} from "../../../dependencies/symbols";
import {
    RegistrationAuthorizationPresenter
} from "../../../presenters/abstractions/authorization/registration-authorization-presenter";
import {
    LoginAuthorizationPresenter
} from "../../../presenters/abstractions/authorization/login-authorization-presenter";


@injectable()
export class AuthorizationControllerImpl implements AuthorizationController {
    constructor(
        @inject(Symbols.UseCases.Authorization.Login) private readonly loginAuthorizationUseCase: LoginAuthorizationUseCase,
        @inject(Symbols.UseCases.Authorization.Registration) private readonly registrationAuthorizationUseCase: RegistrationAuthorizationUseCase,
        @inject(Symbols.Presenters.Authorization.Login) private readonly loginAuthorizationPresenter: LoginAuthorizationPresenter,
        @inject(Symbols.Presenters.Authorization.Registration) private readonly registrationAuthorizationPresenter: RegistrationAuthorizationPresenter
    ) {}

    public async login(params: AuthorizationController.Login.Params): Promise<AuthorizationController.Login.Response> {
        let token = await this.loginAuthorizationUseCase.execute({
            username: params.username,
            password: params.password
        })

        return this.loginAuthorizationPresenter.print(token)
    }

    public async registration(params: AuthorizationController.Registration.Params): Promise<AuthorizationController.Registration.Response> {
        let token = await this.registrationAuthorizationUseCase.execute({
            username: params.username,
            password: params.password,
            phoneNumber: params.phoneNumber,
            fullName: params.fullName
        })

        return this.registrationAuthorizationPresenter.print(token)
    }

    public async logout(params: AuthorizationController.Logout.Params): Promise<AuthorizationController.Logout.Response> {
        return
    }


}