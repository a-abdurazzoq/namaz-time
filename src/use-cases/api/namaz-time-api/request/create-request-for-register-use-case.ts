import {
    CreateRequestForRegisterUseCase, CreateRequestForRegisterUseCaseParams
} from "../../../abstractions";
import {inject, injectable} from "inversify";
import {Symbols} from "../../../../dependencies/symbols";
import {TelegramBotClient} from "../../../../clients/abstractions";
import {RequestRepository} from "../../../../repositories/abstractions";
import {Request} from "../../../../domain/entities/request";

@injectable()
export class CreateRequestForRegisterUseCaseImpl implements CreateRequestForRegisterUseCase {
    constructor(
       @inject(Symbols.Clients.TelegramBot) private readonly telegramBotClient: TelegramBotClient,
       @inject(Symbols.Repositories.Request) private readonly requestRepository: RequestRepository
    ) {}

    public async execute(params: CreateRequestForRegisterUseCaseParams): Promise<Request> {
        const insertRequest = await this.requestRepository.create({
            TelegramChatLink: params.TelegramChatLink,
            telegramUsername: params.telegramUsername,
            districtId: params.districtId,
            cityId: params.cityId
        })

        const sendRequest = await this.telegramBotClient.sendMessage({
            text: `Ссылка на канал: ${insertRequest.getTelegramChatLink()}\n` +
                  `Контакт: ${insertRequest.getTelegramUsername()}\n` +
                  `Адрес: ${insertRequest.getCity().getName()}, ${insertRequest.getDistrict().getName()}`,
            parse_mode: "HTML",
            chat_id: Number(process.env.CHAT_ID_THAT_SENDS_REQUEST)
        })

        if(!sendRequest.ok)
            throw new Error(JSON.stringify(sendRequest))

        return insertRequest
    }
}