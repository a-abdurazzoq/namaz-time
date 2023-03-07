import {RouterBase} from "./index";
import {Request} from "express";
import {
    CreatePostForTelegramController,
    PostForTelegramController
} from "../../../../controllers/abstractions/namaz-time/post-for-telegram";
import {inject, injectable} from "inversify";
import {Symbols} from "../../../../dependencies/symbols";
import {Http} from "../decorators";

namespace RequestRouter {
    export interface CreateByRequest {
        request_id: string;
        chat_id_of_channel: number;
        time_per_day: number;
        html_template_file_base_64: string;
        description_in_photo: string;
        description_for_post: string;
    }
}

@injectable()
@Http.Router("post-for-telegram")
export class PostForTelegramRouterImpl implements RouterBase {
    constructor(
        @inject(Symbols.Controllers.PostForTelegram) private readonly postForTelegramController: PostForTelegramController
    ) {}

    @Http.Post()
    private async createByRequest(req: Request<RequestRouter.CreateByRequest>): Promise<CreatePostForTelegramController.Response> {
        return await this.postForTelegramController.create({
            requestId: req.body.request_id,
            timePerDay: req.body.time_per_day,
            descriptionInPhoto: req.body.description_in_photo,
            descriptionForPost: req.body.description_for_post,
            htmlTemplateFileBase64: req.body.html_template_file_base_64,
            chatIdOfChannel: req.body.chat_id_of_channel,
        })
    }
}