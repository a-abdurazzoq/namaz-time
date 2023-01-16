import {UserDto, UserFactory} from "../abstractions/user";
import {User} from "../../entities/user";

export class UserFactoryImpl implements UserFactory {
    create(dto: UserDto): User {
        return new User(
            dto.username,
            dto.password,
            dto.fullName,
            dto.phoneNumber,
            dto.createAt,
            dto.updateAt
        )
    }
}