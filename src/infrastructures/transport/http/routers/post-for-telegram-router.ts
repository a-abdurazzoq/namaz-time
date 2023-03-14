import {RouterBase, RRequest} from "../../abstractions/http/routers";
import {
    CreatePostForTelegramController,
    PostForTelegramController
} from "../../../../controllers/abstractions";
import {inject, injectable} from "inversify";
import {Symbols} from "../../../../dependencies/symbols";
import {Http} from "../decorators";

namespace PostForTelegramRouter {
    export interface CreateByRequest {
        request_id: string;
        chat_id_of_channel: number;
        time_per_day: number;
        zip_html_template_file_base_64: string;
        description_in_photo: string;
        caption_for_post: string;
    }
}

@injectable()
@Http.Router("post-for-telegram")
export class PostForTelegramRouterImpl implements RouterBase {
    constructor(
        @inject(Symbols.Controllers.PostForTelegram) private readonly postForTelegramController: PostForTelegramController
    ) {}

    @Http.Post()
    @Http.Guard("isAdmin", true)
    private async createByRequest(req: RRequest<PostForTelegramRouter.CreateByRequest>): Promise<CreatePostForTelegramController.Response> {
        return await this.postForTelegramController.create({
            requestId: req.body.request_id,
            timePerDay: req.body.time_per_day,
            descriptionInPhoto: req.body.description_in_photo,
            captionForPost: req.body.caption_for_post,
            zipHtmlTemplateFileBase64: req.body.zip_html_template_file_base_64,
            chatIdOfChannel: req.body.chat_id_of_channel,
        })
    }
}