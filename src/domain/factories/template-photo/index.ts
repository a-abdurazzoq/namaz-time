import {TemplatePhotoDto, TemplatePhotoFactory} from "../abstractions/template-photo";
import {TemplatePhoto} from "../../entities/template-photo";

export class TemplatePhotoFactoryImpl implements TemplatePhotoFactory {
    create(dto: TemplatePhotoDto): TemplatePhoto {
        return new TemplatePhoto(
            dto.fileName,
            dto.user,
            dto.createAt,
            dto.updateAt
        )
    }
}