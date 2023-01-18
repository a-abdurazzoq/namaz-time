import {AddressDto, AddressFactory} from "../../abstractions/factories";
import {Address} from "../../entities";
import {injectable} from "inversify";

@injectable()
export class AddressFactoryImpl implements AddressFactory {
    create(dto: AddressDto): Address {
        return new Address(
            dto.city,
            dto.district,
            dto.street,
            dto.home
        )
    }
}