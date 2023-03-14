import {GuardParams, GuardResponse, IsAdminGuard} from "../../abstractions/guards";
import {inject, injectable} from "inversify";
import {Symbols} from "../../../dependencies/symbols";
import {TokenRepository} from "../../../repositories/abstractions";
import {TokenService} from "../../../services/abstractions";


@injectable()
export class IsAdminGuardImpl implements IsAdminGuard {
    constructor(
        @inject(Symbols.Repositories.Token) private readonly tokenRepository: TokenRepository,
        @inject(Symbols.Services.Token) private readonly tokenService: TokenService
    ) {}

    private readonly notAccess: GuardResponse = {access: false, message: "Неавторизованно! Для получения запрашиваемого ответа нужна аутентификация."}
    private readonly access: GuardResponse = { access: true }

    public async check(context: GuardParams): Promise<GuardResponse> {
        let token = this.getTokenInCookies(context.cookies)
        if(!token)
            return this.notAccess

        let hasToken = this.tokenRepository.hasToken(token)
        if(!hasToken)
            return this.notAccess

        let tokenIsValid = this.tokenService.isValid(token)
        if(!tokenIsValid)
            return this.notAccess

        return this.access
    }

    private hasTokenInCookies(cookies: object): cookies is {token: string} {
        return "token" in cookies
    }

    private getTokenInCookies(cookies: object): string {
        if(!this.hasTokenInCookies(cookies))
            return ""

        return cookies.token
    }
}