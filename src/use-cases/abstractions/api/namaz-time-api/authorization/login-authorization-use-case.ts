import {UseCase} from "../../../index";
import {Token} from "../../../../../domain/entities";

export interface LoginAuthorizationUseCaseParams {
    username: string;
    password: string;
}

export interface LoginAuthorizationUseCase extends UseCase<LoginAuthorizationUseCaseParams, Token> {}