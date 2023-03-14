import {Factory} from "../factory";
import {TemplatePhoto} from "../../../entities";
import {PostData} from "../../../entities/post-for-telegram/post-data";

export interface PostDataDto {
    templatePhoto: TemplatePhoto;
    chatId: number;
    descriptionInPhoto: string;
    captionForPost: string;
}

export interface PostDataFactory extends Factory<PostDataDto, PostData> {}