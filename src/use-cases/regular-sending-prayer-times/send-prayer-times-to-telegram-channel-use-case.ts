import {SendPrayerTimesToTelegramChannel, SendPrayerTimesToTelegramChannelUseCase} from "../abstractions";
import {inject} from "inversify";
import {Symbols} from "../../dependencies/symbols";
import {TelegramBotClient} from "../../clients/abstractions/telegram-bot-client";
import {TemplatePhotoRepository} from "../../repositories/abstractions";

export class SendPrayerTimesToTelegramChannelUseCaseImpl implements SendPrayerTimesToTelegramChannelUseCase {
    constructor(
        @inject(Symbols.Clients.TelegramBot) private telegramBotClient: TelegramBotClient,
        @inject(Symbols.Repositories.TemplatePhoto) private templatePhotoRepository: TemplatePhotoRepository
    ) {}

    async execute(params: SendPrayerTimesToTelegramChannel.Params): Promise<SendPrayerTimesToTelegramChannel.Response> {
        let photoBuffer = await this.templatePhotoRepository.generatePhotoByChatForSendingPrayerTimes(params)

        let response = await this.telegramBotClient.sendPhoto({
            chat_id: params.getChatId(),
            photo: photoBuffer
        })

        if(!response.ok)
            return {
                success: response.ok,
                id: params.getId(),
                name: params.getTelegramChannel().getName(),
                error: {
                    error_code: response.error_code,
                    description: response.description
                },
            }

        return {
            success: response.ok,
            id: params.getId(),
            name: params.getTelegramChannel().getName()
        }
    }
}