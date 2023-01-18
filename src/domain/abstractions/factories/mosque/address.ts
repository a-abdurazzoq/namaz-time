import {Factory} from "../factory";
import {Address} from "../../../entities";
import {City} from "../../../entities";
import {District} from "../../../entities";

export interface AddressDto {
    city: City;
    district: District;
    street: string;
    home: string;
}

export interface AddressFactory extends Factory<AddressDto, Address> {}