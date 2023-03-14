import {SendPrayerTimesToTelegramChat, SendPrayerTimesToTelegramChatUseCase} from "../../abstractions";
import {inject, injectable} from "inversify";
import {Symbols} from "../../../dependencies/symbols";
import {TelegramBotClient} from "../../../clients/abstractions";
import {PostForTelegramRepository, TemplatePhotoRepository} from "../../../repositories/abstractions";

@injectable()
export class SendPrayerTimesToTelegramChatUseCaseImpl implements SendPrayerTimesToTelegramChatUseCase {
    constructor(
        @inject(Symbols.Clients.TelegramBot) private telegramBotClient: TelegramBotClient,
        @inject(Symbols.Repositories.PostForTelegram) private PostForTelegramRepository: PostForTelegramRepository,
        @inject(Symbols.Repositories.TemplatePhoto) private templatePhotoRepository: TemplatePhotoRepository
    ) {}

    async execute(params: SendPrayerTimesToTelegramChat.Params): Promise<SendPrayerTimesToTelegramChat.Response> {
        let photoBuffer = await this.templatePhotoRepository.generatePhotoByPostForTelegram({
            postForTelegram: params.postForTelegram,
            necessaryDate: params.necessaryDate
        })

        let response = await this.telegramBotClient.sendPhoto({
            chat_id: params.postForTelegram.getPostData().getChatId(),
            caption: params.postForTelegram.getPostData().getCaptionForPost(),
            photo: photoBuffer
        })

        if(!response.ok)
            return {
                success: response.ok,
                id: params.postForTelegram.getId(),
                name: params.postForTelegram.getTelegramChat().getName(),
                error: {
                    error_code: response.error_code,
                    description: response.description
                },
            }

        await this.PostForTelegramRepository.updateNextTime(params.postForTelegram)

        return {
            success: response.ok,
            id: params.postForTelegram.getId(),
            name: params.postForTelegram.getTelegramChat().getName()
        }
    }
}