import {injectable} from "inversify";
import {PostDataDto, PostDataFactory} from "../../abstractions/factories/post-for-telegram/post-data";
import {PostData} from "../../entities/post-for-telegram/post-data";

@injectable()
export class PostDataFactoryImpl implements PostDataFactory {
    public create(dto: PostDataDto): PostData {
        return new PostData(
            dto.templatePhoto,
            dto.chatId,
            dto.descriptionInPhoto,
            dto.captionForPost
        )
    }

}