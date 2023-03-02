import {UseCase} from "../../../index";
import {Request} from "../../../../../domain/entities/request";

export interface CreateRequestForRegisterUseCaseParams {
    TelegramChatLink: string;
    telegramUsername: string;
    cityId: number;
    districtId: number;
}

export interface CreateRequestForRegisterUseCase extends UseCase<CreateRequestForRegisterUseCaseParams, Request> {}