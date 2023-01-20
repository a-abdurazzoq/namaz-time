import {TelegramChannel} from "../../domain/entities";

export interface TelegramChannelRepository {
    getById(id: string): Promise<TelegramChannel>;
}