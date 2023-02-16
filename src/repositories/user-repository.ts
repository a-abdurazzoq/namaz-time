import {UserRepository} from "./abstractions";
import {inject, injectable} from "inversify";
import {UserFactory} from "../domain/abstractions/factories";
import {Symbols} from "../dependencies/symbols";
import {User} from "../domain/entities";
import {UserModel, IUserModel} from "../models";

@injectable()
export class UserRepositoryImpl implements UserRepository {
    constructor(
        @inject(Symbols.Factories.User) private userFactory: UserFactory
    ) {}

    public async getById(id: string): Promise<User> {
        let getUser = await UserModel.findById(id)

        if(!getUser)
            throw new Error("User not found by id")

        return this.toEntity(getUser)
    }

    private toEntity(userModel: IUserModel): User {
        return this.userFactory.create({
            id: userModel._id.toHexString(),
            fullName: userModel.full_name,
            phoneNumber: userModel.phone_number,
            username: userModel.username,
            password: userModel.password,
            createAt: userModel.create_at,
            updateAt: userModel.update_at
        })
    }

}