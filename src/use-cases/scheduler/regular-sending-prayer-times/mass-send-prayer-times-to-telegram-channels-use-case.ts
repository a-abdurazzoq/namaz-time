import {
    MassSendPrayerTimesToTelegramChats,
    MassSendPrayerTimesToTelegramChatsUseCase, SendPrayerTimesToTelegramChat,
    SendPrayerTimesToTelegramChatUseCase
} from "../../abstractions";
import {inject, injectable} from "inversify";
import {Symbols} from "../../../dependencies/symbols";
import Chat = MassSendPrayerTimesToTelegramChats.Chat;
import ChatWithError = MassSendPrayerTimesToTelegramChats.ChatWithError;

@injectable()
export class MassSendPrayerTimesToTelegramChatsUseCaseImpl implements MassSendPrayerTimesToTelegramChatsUseCase {
    constructor(
       @inject(Symbols.UseCases.SendPrayerTimesToTelegramChat) private sendPrayerTimesToTelegramChatUseCase: SendPrayerTimesToTelegramChatUseCase
    ) {}

    async execute(params: MassSendPrayerTimesToTelegramChats.Params): Promise<MassSendPrayerTimesToTelegramChats.Response> {
        let success: MassSendPrayerTimesToTelegramChats.Results<Chat> = {count: 0, chats: []}
        let failed: MassSendPrayerTimesToTelegramChats.Results<ChatWithError> = {count: 0, chats: []}

        let necessaryDate = new Date();
        necessaryDate.setDate(necessaryDate.getDate()+1)
        necessaryDate.setHours(0, 0, 0, 0,)

        for (let i = 0; i < params.length; i++) {
            let PostForTelegram = params[i]
            let response = await this.sendPrayerTimesToTelegramChatUseCase.execute({
                necessaryDate: necessaryDate,
                PostForTelegram: PostForTelegram
            })

            if(this.isError(response)) {
                failed.count++
                failed.chats.push({
                    post_for_telegrams_id: response.id,
                    telegram_chat_name: response.name,
                    error: response.error
                })

                continue;
            }

            success.count++
            success.chats.push({
                post_for_telegrams_id: response.id,
                telegram_chat_name: response.name
            })
        }

        return {
            success: success,
            failed: failed
        }
    }

    private isError(result: SendPrayerTimesToTelegramChat.Response): result is SendPrayerTimesToTelegramChat.Error {
        return !result.success
    }
}