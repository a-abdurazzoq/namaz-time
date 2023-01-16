import {Factory} from "../factory";
import {Address} from "../../../entities/mosque/address";
import {City} from "../../../entities/city";
import {District} from "../../../entities/district";

export interface AddressDto {
    city: City;
    district: District;
    street: string;
    home: string;
}

export interface AddressFactory extends Factory<AddressDto, Address> {}