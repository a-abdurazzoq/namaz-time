import {UserDto, UserFactory} from "../../abstractions/factories";
import {User} from "../../entities";
import {injectable} from "inversify";

@injectable()
export class UserFactoryImpl implements UserFactory {
    create(dto: UserDto): User {
        return new User(
            dto.id,
            dto.username,
            dto.password,
            dto.fullName,
            dto.phoneNumber,
            dto.createAt,
            dto.updateAt
        )
    }
}