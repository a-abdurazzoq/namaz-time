import {User} from "../../domain/entities";

export interface UserRepository {
    getById(id: string): Promise<User>;
}