import {Request} from "../../domain/entities/request";

export interface RequestRepository {
    create(params: createRequestParams): Promise<Request>;
    getAll(): Promise<Request[]>;
    getById(requestId: string): Promise<Request>;
}

export interface createRequestParams {
    TelegramChatLink: string;
    telegramUsername: string;
    districtId: number;
    cityId: number;
}