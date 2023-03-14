import {Token, User} from "../../domain/entities";

export interface TokenRepository {
    create(user: User): Promise<Token>;
    getByToken(token: string): Promise<Token>;
    updateByUserId(user: User): Promise<Token>;
    hasTokenByUserId(user: User): Promise<boolean>;
    hasToken(token: string): Promise<boolean>;
}

export interface DataInToken {
    id: string;
    username: string;
    phoneNumber: string;
}