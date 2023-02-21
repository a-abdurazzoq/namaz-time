import {Factory} from "../factory";
import {Request} from "../../../entities/request";

export interface RequestDto {
    id: string
    telegramChannelLink: string
    telegramUsername: string
    cityId: number
    districtId: number
    createAt: Date
    updateAt: Date
}

export interface RequestFactory extends Factory<RequestDto, Request> {}