import {Factory} from "../factory";
import {Mosque} from "../../../entities/mosque";
import {User} from "../../../entities/user";
import {Address} from "../../../entities/mosque/address";

export interface MosqueDto {
    name: string;
    user: User;
    address: Address;
    createAt: Date;
    updateAt: Date;
}

export interface MosqueFactory extends Factory<MosqueDto, Mosque> {}