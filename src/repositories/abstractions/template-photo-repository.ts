import {TemplatePhoto} from "../../domain/entities";

export interface TemplatePhotoRepository {
    getById(id: string): Promise<TemplatePhoto>;
}