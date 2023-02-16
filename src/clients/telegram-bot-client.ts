import {SendPhoto, TelegramBotClient} from "./abstractions/telegram-bot-client";
import FormData from "form-data";
import axios, {AxiosError, AxiosResponse} from "axios";
import {injectable} from "inversify";

interface SendParams {
    method: string;
    data: any;
}

@injectable()
export class TelegramBotClientImpl implements TelegramBotClient {
    private url = "https://api.telegram.org/bot"
    private token = "5810395844:AAGQd8iW7uIPfR33LX_zMq5uQo0MS2XbBZ8"

    public async sendPhoto(params: SendPhoto.Params): Promise<SendPhoto.Response> {
        let formData = new FormData()
        formData.append("chat_id", params.chat_id)
        formData.append("photo", params.photo, Date.now().toString())
        formData.append("caption", params.caption || "")
        formData.append("parse_mode", "HTML")

        let response = await this.send<SendPhoto.Response>({
            method: "sendPhoto",
            data: formData
        })

        if(!response)
            return {
                ok: false,
                error_code: 0,
                description: "Причина неизвестна"
            }

        return response
    }

    private getUrl(token: string, method: string) {
        return `${this.url}${token}/${method}`
    }

    private send<Response>(params: SendParams) {
        return axios.post<Response>(
            this.getUrl(this.token, params.method),
            params.data
        )
        .then((response: AxiosResponse<Response>) => {
            return response.data
        })
        .catch((error: AxiosError<Response>) => {
            return error.response?.data
        })
    }
}