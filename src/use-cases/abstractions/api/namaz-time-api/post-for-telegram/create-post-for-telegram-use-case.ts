import {UseCase} from "../../../index";
import {PostForTelegram} from "../../../../../domain/entities";

export interface CreatePostForTelegramUseCaseParams {
    requestId: string;
    chatIdOfChannel: number;
    timePerDay: number;
    zipHtmlTemplateFileBase64: string;
    descriptionInPhoto: string;
    captionForPost: string;
}

export interface CreatePostForTelegramUseCase extends UseCase<CreatePostForTelegramUseCaseParams, PostForTelegram> {}