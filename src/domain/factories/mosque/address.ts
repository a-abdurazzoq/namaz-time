import {AddressDto, AddressFactory} from "../abstractions/mosque/address";
import {Address} from "../../entities/mosque/address";

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