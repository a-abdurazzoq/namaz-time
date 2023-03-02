import {UseCase} from "../../../index";
import {PostForTelegram} from "../../../../../domain/entities";

export interface CreatePostForTelegramUseCaseParams {
    requestId: string;
    chatIdOfChannel: number;
    timePerDay: number;
    htmlTemplateFileBase64: string;
    descriptionInPhoto: string;
    descriptionForPost: string;
}

export interface CreatePostForTelegramUseCase extends UseCase<CreatePostForTelegramUseCaseParams, PostForTelegram> {}