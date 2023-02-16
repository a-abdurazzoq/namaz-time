import {SendPrayerTimesToTelegramChannel, SendPrayerTimesToTelegramChannelUseCase} from "../../abstractions";
import {inject, injectable} from "inversify";
import {Symbols} from "../../../dependencies/symbols";
import {TelegramBotClient} from "../../../clients/abstractions/telegram-bot-client";
import {ChatForSendingPrayerTimesRepository, TemplatePhotoRepository} from "../../../repositories/abstractions";

@injectable()
export class SendPrayerTimesToTelegramChannelUseCaseImpl implements SendPrayerTimesToTelegramChannelUseCase {
    constructor(
        @inject(Symbols.Clients.TelegramBot) private telegramBotClient: TelegramBotClient,
        @inject(Symbols.Repositories.ChatForSendingPrayerTimes) private chatForSendingPrayerTimesRepository: ChatForSendingPrayerTimesRepository,
        @inject(Symbols.Repositories.TemplatePhoto) private templatePhotoRepository: TemplatePhotoRepository
    ) {}

    async execute(params: SendPrayerTimesToTelegramChannel.Params): Promise<SendPrayerTimesToTelegramChannel.Response> {
        let photoBuffer = await this.templatePhotoRepository.generatePhotoByChatForSendingPrayerTimes(params)

        let response = await this.telegramBotClient.sendPhoto({
            chat_id: params.chatForSendingPrayerTimes.getChatId(),
            photo: photoBuffer
        })

        if(!response.ok)
            return {
                success: response.ok,
                id: params.chatForSendingPrayerTimes.getId(),
                name: params.chatForSendingPrayerTimes.getTelegramChannel().getName(),
                error: {
                    error_code: response.error_code,
                    description: response.description
                },
            }

        await this.chatForSendingPrayerTimesRepository.updateNextTime(params.chatForSendingPrayerTimes)

        return {
            success: response.ok,
            id: params.chatForSendingPrayerTimes.getId(),
            name: params.chatForSendingPrayerTimes.getTelegramChannel().getName()
        }
    }
}