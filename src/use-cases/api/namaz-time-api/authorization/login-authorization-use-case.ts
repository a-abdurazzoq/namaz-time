import {
    LoginAuthorizationUseCase, LoginAuthorizationUseCaseParams
} from "../../../abstractions";
import {Token} from "../../../../domain/entities";
import {inject, injectable} from "inversify";
import {Symbols} from "../../../../dependencies/symbols";
import {TokenRepository, UserRepository} from "../../../../repositories/abstractions";
import {CryptoService} from "../../../../services/abstractions";

@injectable()
export class LoginAuthorizationUseCaseImpl implements LoginAuthorizationUseCase {
    constructor(
        @inject(Symbols.Repositories.Token) private readonly tokenRepository: TokenRepository,
        @inject(Symbols.Repositories.User) private readonly userRepository: UserRepository,
        @inject(Symbols.Services.Crypto) private readonly cryptoService: CryptoService
    ) {}

    public async execute(params: LoginAuthorizationUseCaseParams): Promise<Token> {
        let getUser = await this.userRepository.getByUsername(params.username);

        let checkPassword = await this.cryptoService.compare({text: params.password, hash: getUser.getPassword()});

        if(!checkPassword)
            throw new Error("Неверны логин или пароль")

        let hasToken = await this.tokenRepository.hasTokenByUserId(getUser)

        if(!hasToken)
            return this.tokenRepository.create(getUser)

        return this.tokenRepository.updateByUserId(getUser)
    }
}