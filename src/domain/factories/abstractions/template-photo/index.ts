import {Factory} from "../factory";
import {TemplatePhoto} from "../../../entities/template-photo";
import {User} from "../../../entities/user";

export interface TemplatePhotoDto {
    fileName: string;
    user: User;
    createAt: Date;
    updateAt: Date;
}

export interface TemplatePhotoFactory extends Factory<TemplatePhotoDto, TemplatePhoto> {}