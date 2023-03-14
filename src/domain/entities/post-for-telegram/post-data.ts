import {TemplatePhoto} from "../template-photo";

export class PostData {
    constructor(
        private templatePhoto: TemplatePhoto,
        private chatId: number,
        private descriptionInPhoto: string,
        private captionForPost: string
    ) {
        this.isChatId(chatId)
        this.isDescriptionInPhoto(descriptionInPhoto)
        this.isCaptionForPost(captionForPost)
    }

    public getTemplatePhoto(): TemplatePhoto {
        return this.templatePhoto
    }

    public getChatId(): number {
        return this.chatId
    }

    public getDescriptionInPhoto(): string {
        return this.descriptionInPhoto
    }

    public getCaptionForPost(): string {
        return this.captionForPost
    }


    private isChatId(chatId: number): void | never {
        if(chatId.constructor !== Number)
            throw new Error("chatId is not defined as Number")

    }

    private isDescriptionInPhoto(descriptionInPhoto: string): void | never {
        if(descriptionInPhoto.constructor !== String)
            throw new Error("descriptionInPhoto is not defined as String")

    }

    private isCaptionForPost(captionForPost: string): void | never {
        if(captionForPost.constructor !== String)
            throw new Error("captionForPost is not defined as String")

    }
}