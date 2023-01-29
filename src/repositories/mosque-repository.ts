import {CityRepository, DistrictRepository, MosqueRepository, UserRepository} from "./abstractions";
import {inject, injectable} from "inversify";
import {Symbols} from "../dependencies/symbols";
import {Mosque} from "../domain/entities";
import {IMosqueModel, MosqueModel} from "../models";
import {AddressFactory, MosqueFactory} from "../domain/abstractions/factories";

@injectable()
export class MosqueRepositoryImpl implements MosqueRepository {
    constructor(
        @inject(Symbols.Factories.Mosque) private mosqueFactory: MosqueFactory,
        @inject(Symbols.Factories.Address) private addressFactory: AddressFactory,
        @inject(Symbols.Repositories.City) private cityRepository: CityRepository,
        @inject(Symbols.Repositories.District) private districtRepository: DistrictRepository,
        @inject(Symbols.Repositories.User) private userRepository: UserRepository,
    ) {}

    public async getById(id: string): Promise<Mosque> {
        let getMosque = await MosqueModel.findById<IMosqueModel>(id)

        if(!getMosque)
            throw new Error("Mosque not found by id")

        return this.toEntity(getMosque)
    }

    private async toEntity(mosqueModel: IMosqueModel): Promise<Mosque> {
        let user = await this.userRepository.getById(mosqueModel.user_id.toHexString())
        let city = await this.cityRepository.getById(mosqueModel.address.city_id)
        let district = await this.districtRepository.getById(mosqueModel.address.district_id)

        let address = this.addressFactory.create({
            home: mosqueModel.address.home,
            street: mosqueModel.address.street,
            city: city,
            district: district
        })

        return this.mosqueFactory.create({
            id: mosqueModel._id.toHexString(),
            name: mosqueModel.name,
            user: user,
            address: address,
            updateAt: mosqueModel.update_at,
            createAt: mosqueModel.create_at
        })
    }
}