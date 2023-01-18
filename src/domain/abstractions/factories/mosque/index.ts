import {Factory} from "../factory";
import {Mosque} from "../../../entities";
import {User} from "../../../entities";
import {Address} from "../../../entities";

export interface MosqueDto {
    name: string;
    user: User;
    address: Address;
    createAt: Date;
    updateAt: Date;
}

export interface MosqueFactory extends Factory<MosqueDto, Mosque> {}