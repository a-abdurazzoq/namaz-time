import {TemplatePhotoDto, TemplatePhotoFactory} from "../../abstractions/factories";
import {TemplatePhoto} from "../../entities";
import {injectable} from "inversify";

@injectable()
export class TemplatePhotoFactoryImpl implements TemplatePhotoFactory {
    create(dto: TemplatePhotoDto): TemplatePhoto {
        return new TemplatePhoto(
            dto.id,
            dto.fileName,
            dto.telegramChat,
            dto.createAt,
            dto.updateAt
        )
    }
}