
import {injectable} from "inversify";
import {
    GetMeAuthorizationPresenter
} from "../abstractions";


@injectable()
export class GetMeAuthorizationPresenterImpl implements GetMeAuthorizationPresenter {
    public print(params: GetMeAuthorizationPresenter.Params): GetMeAuthorizationPresenter.Response {
        return {
            id: params.getId(),
            full_name: params.getFullName()
        };
    }
}