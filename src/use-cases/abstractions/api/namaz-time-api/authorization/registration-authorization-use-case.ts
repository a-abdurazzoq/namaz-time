import {UseCase} from "../../../index";
import {Token} from "../../../../../domain/entities";

export interface RegistrationAuthorizationUseCaseParams {
    username: string;
    password: string;
    fullName: string;
    phoneNumber: string;
}

export interface RegistrationAuthorizationUseCase extends UseCase<RegistrationAuthorizationUseCaseParams, Token> {}