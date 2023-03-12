import {GuardParams, GuardResponse, IsAdminGuard} from "../../abstractions/guards";
import {injectable} from "inversify";
import {Promise} from "mongoose";


@injectable()
export class IsAdminGuardImpl implements IsAdminGuard {
    constructor(

    ) {}

    public check(context: GuardParams): Promise<GuardResponse> {
        return Promise.resolve({})
    }
}