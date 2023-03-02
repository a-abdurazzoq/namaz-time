import {
    GetChat,
    GetChatAdministrators,
    HasPermission,
    SendMessage,
    SendPhoto,
    TelegramBotClient
} from "./abstractions/telegram-bot-client";
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
    private bot_id = 234234



    public async getChat(params: GetChat.Params): Promise<GetChat.Response> {
        return this.send<GetChat.Response>({
            method: "getChat",
            data: {
                chat_id: params.chat_id
            }
        })
    }

    public getChatAdministrators(params: GetChatAdministrators.Params): Promise<GetChatAdministrators.Response> {
        return this.send<GetChatAdministrators.Response>({
            method: "getChatAdministrators",
            data: {
                chat_id: params.chat_id
            }
        })
    }

    public sendMessage(params: SendMessage.Params): Promise<SendMessage.Response> {
        return this.send<SendPhoto.Response>({
            method: "sendMessage",
            data: {
                chat_id: params.chat_id,
                text: params.text,
                parse_mode: params.parse_mode || "",
            }
        })
    }

    public async sendPhoto(params: SendPhoto.Params): Promise<SendPhoto.Response> {
        let formData = new FormData()
        formData.append("chat_id", params.chat_id)
        formData.append("photo", params.photo, Date.now().toString())
        formData.append("caption", params.caption || "")
        formData.append("parse_mode", "HTML")

        return this.send<SendPhoto.Response>({
            method: "sendPhoto",
            data: formData
        })
    }

    public async hasPermission(params: HasPermission.Params): Promise<boolean> {
        let getAdminsOfChats = await this.getChatAdministrators(params)

        if(!getAdminsOfChats.ok)
            return false

        let findOwnBot = getAdminsOfChats.result
            .find(userOrBot =>
                this.isBot(userOrBot) &&
                userOrBot.user.id === this.bot_id &&
                userOrBot.status === GetChatAdministrators.StatusUserEnum.ADMINISTRATOR &&
                userOrBot.can_post_messages
            )

        return !!findOwnBot
    }

    private isBot(user: GetChatAdministrators.User | GetChatAdministrators.Bot): user is GetChatAdministrators.Bot {
        return user.user.is_bot
    }

    private getUrl(token: string, method: string) {
        return `${this.url}${token}/${method}`
    }

    private async send<Response>(params: SendParams): Promise<Response> {
        let response = await axios.post<Response>(
            this.getUrl(this.token, params.method),
            params.data
        )
        .then((response: AxiosResponse<Response>) => {
            return response.data
        })
        .catch((error: AxiosError<Response>) => {
            return error.response?.data
        })

        if(!response)
            return {
                ok: false,
                error_code: 0,
                description: "Причина неизвестна"
            } as Response

        return response
    }
}