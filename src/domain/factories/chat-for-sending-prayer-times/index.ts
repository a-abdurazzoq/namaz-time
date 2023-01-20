import {ChatForSendingPrayerTimesDto, ChatForSendingPrayerTimesFactory} from "../../abstractions/factories";
import {ChatForSendingPrayerTimes} from "../../entities";
import {injectable} from "inversify";

@injectable()
export class ChatForSendingPrayerTimesFactoryImpl implements ChatForSendingPrayerTimesFactory {
    create(dto: ChatForSendingPrayerTimesDto): ChatForSendingPrayerTimes {
        return new ChatForSendingPrayerTimes(
            dto.id,
            dto.telegramChannelId,
            dto.chatId,
            dto.timePerDay,
            dto.nextTime,
            dto.createAt,
            dto.updateAt
        )
    }
}