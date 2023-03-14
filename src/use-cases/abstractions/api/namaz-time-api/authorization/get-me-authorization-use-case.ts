import {UseCase} from "../../../index";
import {User} from "../../../../../domain/entities";



export interface GetMeAuthorizationUseCase extends UseCase<GetMeAuthorizationUseCase.Params, GetMeAuthorizationUseCase.Response> {}

export namespace GetMeAuthorizationUseCase {
    export interface Params {
        token: string;
    }
    export type Response = User
}