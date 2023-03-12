import {User} from "../../domain/entities";

export interface UserRepository {
    create(params: CreateUserRepositoryParams): Promise<User>
    getById(id: string): Promise<User>;
    getByUsername(username: string): Promise<User>;
    hasUsername(username: string): Promise<boolean>;
}

export interface CreateUserRepositoryParams {
    username: string;
    password: string;
    fullName: string;
    phoneNumber?: string
}