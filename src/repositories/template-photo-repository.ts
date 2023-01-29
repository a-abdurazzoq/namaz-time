import {TemplatePhotoRepository, UserRepository} from "./abstractions";
import {inject, injectable} from "inversify";
import {TemplatePhotoFactory} from "../domain/abstractions/factories";
import {Symbols} from "../dependencies/symbols";
import {TemplatePhoto} from "../domain/entities";
import {TemplatePhotoModel, ITemplatePhotoModel} from "../models";

@injectable()
export class TemplatePhotoRepositoryImpl implements TemplatePhotoRepository {
    constructor(
        @inject(Symbols.Factories.TemplatePhoto) private templatePhotoFactory: TemplatePhotoFactory,
        @inject(Symbols.Repositories.User) private userRepository: UserRepository
    ) {}

    public async getById(id: string): Promise<TemplatePhoto> {
        let getTemplatePhoto = await TemplatePhotoModel.findById<ITemplatePhotoModel>(id)

        if(!getTemplatePhoto)
            throw new Error("Template photo not found by id")

        return this.toEntity(getTemplatePhoto)
    }

    private async toEntity(templatePhotoModel: ITemplatePhotoModel): Promise<TemplatePhoto> {
        let user = await this.userRepository.getById(templatePhotoModel._id.toHexString())

        return this.templatePhotoFactory.create({
            id: templatePhotoModel._id.toHexString(),
            fileName: templatePhotoModel.file_name,
            user: user,
            createAt: templatePhotoModel.create_at,
            updateAt: templatePhotoModel.update_at
        })
    }

}