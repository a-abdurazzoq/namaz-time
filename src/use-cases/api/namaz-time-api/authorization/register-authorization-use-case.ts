import {
    RegistrationAuthorizationUseCase, RegistrationAuthorizationUseCaseParams
} from "../../../abstractions/api/namaz-time-api/authorization/registration-authorization-use-case";
import {Token} from "../../../../domain/entities";
import {inject, injectable} from "inversify";
import {Symbols} from "../../../../dependencies/symbols";
import {TokenRepository, UserRepository} from "../../../../repositories/abstractions";
import {CryptoService} from "../../../../services/abstractions";

@injectable()
export class RegisterAuthorizationUseCaseImpl implements RegistrationAuthorizationUseCase {
    constructor(
        @inject(Symbols.Repositories.Token) private readonly tokenRepository: TokenRepository,
        @inject(Symbols.Repositories.User) private readonly userRepository: UserRepository,
        @inject(Symbols.Services.Crypto) private readonly cryptoService: CryptoService
    ) {}

    public async execute(params: RegistrationAuthorizationUseCaseParams): Promise<Token> {
        let hasUsername = await this.userRepository.hasUsername(params.username)

        if(hasUsername)
            throw new Error("Пользователь с таким именим существует.\nВведите другой имя пользователя")

        let hashedPassword = await this.cryptoService.hash(params.password)

        let createdUser = await this.userRepository.create({
            username: params.username,
            password: hashedPassword,
            fullName: params.fullName,
            phoneNumber: params.phoneNumber
        })

        return this.tokenRepository.create(createdUser)
    }

}