import {
    GetMeAuthorizationUseCase
} from "../../../abstractions";
import {inject, injectable} from "inversify";
import {Symbols} from "../../../../dependencies/symbols";
import {TokenRepository} from "../../../../repositories/abstractions";

@injectable()
export class GetMeAuthorizationUseCaseImpl implements GetMeAuthorizationUseCase {
    constructor(
        @inject(Symbols.Repositories.Token) private readonly tokenRepository: TokenRepository
    ) {}

    public async execute(params: GetMeAuthorizationUseCase.Params): Promise<GetMeAuthorizationUseCase.Response> {
        let token = await this.tokenRepository.getByToken(params.token)

        return token.getUser();
    }
}