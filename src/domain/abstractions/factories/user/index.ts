import {Factory} from "../factory";
import {User} from "../../../entities";

export interface UserDto {
    id: string;
    username: string;
    password: string;
    fullName: string;
    phoneNumber: string;
    createAt: Date;
    updateAt: Date;
}

export interface UserFactory extends Factory<UserDto, User> {}