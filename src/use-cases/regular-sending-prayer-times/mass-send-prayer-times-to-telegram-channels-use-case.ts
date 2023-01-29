import {
    MassSendPrayerTimesToTelegramChannels,
    MassSendPrayerTimesToTelegramChannelsUseCase, SendPrayerTimesToTelegramChannel,
    SendPrayerTimesToTelegramChannelUseCase
} from "../abstractions";
import {inject} from "inversify";
import {Symbols} from "../../dependencies/symbols";
import Chat = MassSendPrayerTimesToTelegramChannels.Chat;
import ChatWithError = MassSendPrayerTimesToTelegramChannels.ChatWithError;

export class MassSendPrayerTimesToTelegramChannelsUseCaseImpl implements MassSendPrayerTimesToTelegramChannelsUseCase {
    constructor(
       @inject(Symbols.UseCases.SendPrayerTimesToTelegramChannel) private sendPrayerTimesToTelegramChannelUseCase: SendPrayerTimesToTelegramChannelUseCase
    ) {}

    async execute(params: MassSendPrayerTimesToTelegramChannels.Params): Promise<MassSendPrayerTimesToTelegramChannels.Response> {
        let success: MassSendPrayerTimesToTelegramChannels.Results<Chat> = {count: 0, chats: []}
        let failed: MassSendPrayerTimesToTelegramChannels.Results<ChatWithError> = {count: 0, chats: []}

        for (let i = 0; i < params.length; i++) {
            let chat = params[i]
            let response = await this.sendPrayerTimesToTelegramChannelUseCase.execute(chat)

            if(this.isError(response)) {
                failed.count++
                failed.chats.push({
                    id: response.id,
                    name: response.name,
                    error: response.error
                })

                continue;
            }

            success.count++
            success.chats.push({
                id: response.id,
                name: response.name
            })
        }

        return {
            success: success,
            failed: failed
        }
    }

    private isError(result: SendPrayerTimesToTelegramChannel.Response): result is SendPrayerTimesToTelegramChannel.Error {
        return result.success
    }
}