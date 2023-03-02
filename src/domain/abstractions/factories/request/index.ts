import {Factory} from "../factory";
import {Request} from "../../../entities/request";
import {City, District} from "../../../entities";

export interface RequestDto {
    id: string;
    TelegramChatLink: string;
    telegramUsername: string;
    city: City;
    district: District;
    createAt: Date;
    updateAt: Date;
}

export interface RequestFactory extends Factory<RequestDto, Request> {}