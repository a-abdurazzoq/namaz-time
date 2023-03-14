import {injectable} from "inversify";
import {GetAllRequestPresenter} from "../abstractions/request/get-all-request-presenter";

@injectable()
export class GetAllRequestPresenterImpl implements GetAllRequestPresenter {
    public print(params: GetAllRequestPresenter.Params): GetAllRequestPresenter.Response {
        return params.map(request => ({
            telegram_channel_link: request.getTelegramChatLink(),
            telegram_username: request.getTelegramUsername(),
            city: {
                id: request.getCity().getId(),
                name: request.getCity().getName()
            },
            district: {
                id: request.getDistrict().getId(),
                name: request.getDistrict().getName()
            }
        }))
    }

}