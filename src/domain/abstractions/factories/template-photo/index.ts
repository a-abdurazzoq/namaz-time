import {Factory} from "../factory";
import {TemplatePhoto} from "../../../entities";
import {User} from "../../../entities";

export interface TemplatePhotoDto {
    id: string;
    fileName: string;
    user: User;
    createAt: Date;
    updateAt: Date;
}

export interface TemplatePhotoFactory extends Factory<TemplatePhotoDto, TemplatePhoto> {}