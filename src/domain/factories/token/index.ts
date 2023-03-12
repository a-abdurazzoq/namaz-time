import {TokenDto, TokenFactory} from "../../abstractions/factories";
import {Token} from "../../entities";
import {injectable} from "inversify";

@injectable()
export class TokenFactoryImpl implements TokenFactory {
    create(dto: TokenDto): Token {
        return new Token(
            dto.id,
            dto.user,
            dto.token,
            dto.expireIn,
            dto.expireOn,
            dto.createAt,
            dto.updateAt
        )
    }
}