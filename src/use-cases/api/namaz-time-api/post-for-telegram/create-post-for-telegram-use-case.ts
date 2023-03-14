import {CreatePostForTelegramUseCase, CreatePostForTelegramUseCaseParams} from "../../../abstractions";
import {PostForTelegram} from "../../../../domain/entities";
import {inject, injectable} from "inversify";
import {TelegramBotClient} from "../../../../clients/abstractions";
import {Symbols} from "../../../../dependencies/symbols";
import {
    PostForTelegramRepository,
    TelegramChatRepository,
    TemplatePhotoRepository,
    RequestRepository
} from "../../../../repositories/abstractions";


@injectable()
export class CreatePostForTelegramUseCaseImpl implements CreatePostForTelegramUseCase {
    constructor(
        @inject(Symbols.Clients.TelegramBot) private readonly telegramBotClient: TelegramBotClient,
        @inject(Symbols.Repositories.TelegramChat) private readonly telegramChatRepository: TelegramChatRepository,
        @inject(Symbols.Repositories.TemplatePhoto) private readonly templatePhotoRepository: TemplatePhotoRepository,
        @inject(Symbols.Repositories.PostForTelegram) private readonly postForTelegramRepository: PostForTelegramRepository,
        @inject(Symbols.Repositories.Request) private readonly requestRepository: RequestRepository
    ) {}

    public async execute(params: CreatePostForTelegramUseCaseParams): Promise<PostForTelegram> {
        const request = await this.requestRepository.getById(params.requestId)
        const hasPermission = await this.telegramBotClient.hasPermission({chat_id: params.chatIdOfChannel})

        if (!hasPermission)
            throw new Error("Нет доступа боту для отправления сообщения на указанном телеграм чате");

        const createdTelegramChat = await this.telegramChatRepository.create({
            chat_id: params.chatIdOfChannel,
            address: {
                city_id: request.getCity().getId(),
                district_id: request.getDistrict().getId(),
                street: "",
                home: "",
            }
        })

        const createdTemplatePhoto = await this.templatePhotoRepository.create({
            telegramChat: createdTelegramChat,
            zipHtmlTemplateFileBase64: params.zipHtmlTemplateFileBase64
        })

        return await this.postForTelegramRepository.create({
            telegramChat: createdTelegramChat,
            templatePhoto: createdTemplatePhoto,
            timePerDay: params.timePerDay,
            captionForPost: params.captionForPost,
            descriptionInPhoto: params.descriptionInPhoto
        })
    }

}