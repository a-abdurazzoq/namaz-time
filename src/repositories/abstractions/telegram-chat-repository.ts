import {TelegramChat} from "../../domain/entities";

export interface TelegramChatRepository {
    create(params: CreateTelegramChatRepositoryParams): Promise<TelegramChat>;
    getById(id: string): Promise<TelegramChat>;
}

export interface CreateTelegramChatRepositoryParams {
    address: {
        city_id: number;
        district_id: number;
        street: string;
        home: string;
    };
    chat_id: number;
}