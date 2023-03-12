import {Factory} from "../factory";
import {User, Token} from "../../../entities";

export interface TokenDto {
    id: string;
    user: User;
    token: string;
    expireIn: number;
    expireOn: Date;
    createAt: Date;
    updateAt: Date;
}

export interface TokenFactory extends Factory<TokenDto, Token> {}