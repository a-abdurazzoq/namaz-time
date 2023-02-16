import {MosqueRepository, TelegramChannelRepository} from "./abstractions";
import {inject, injectable} from "inversify";
import {Symbols} from "../dependencies/symbols";
import {TelegramChannel} from "../domain/entities";
import {TelegramChannelModel, ITelegramChannelModel} from "../models";
import {TelegramChannelFactory} from "../domain/abstractions/factories";

@injectable()
export class TelegramChannelRepositoryImpl implements TelegramChannelRepository {
    constructor(
        @inject(Symbols.Factories.TelegramChannel) private telegramChannelFactory: TelegramChannelFactory,
        @inject(Symbols.Repositories.Mosque) private mosqueRepository: MosqueRepository
    ) {}

    public async getById(id: string): Promise<TelegramChannel> {
        let getTelegramChannel = await TelegramChannelModel.findById<ITelegramChannelModel>(id)

        if(!getTelegramChannel)
            throw new Error("Telegram channel not found by id")

        return this.toEntity(getTelegramChannel)
    }

    private async toEntity(telegramChannelModel: ITelegramChannelModel): Promise<TelegramChannel> {
        let mosque = null

        if (telegramChannelModel.mosque_id)
            mosque = await this.mosqueRepository.getById(telegramChannelModel.mosque_id.toHexString())

        return this.telegramChannelFactory.create({
            id: telegramChannelModel._id.toHexString(),
            name: telegramChannelModel.name,
            chatId: telegramChannelModel.chat_id,
            mosque: mosque,
            createAt: telegramChannelModel.create_at,
            updateAt: telegramChannelModel.update_at
        })
    }

}