import {
    CityRepository,
    CreateTelegramChatRepositoryParams,
    DistrictRepository,
    TelegramChatRepository
} from "./abstractions";
import {inject, injectable} from "inversify";
import {Symbols} from "../dependencies/symbols";
import {TelegramChat, TelegramChatType} from "../domain/entities";
import {ITelegramChatModel, TelegramChatModel} from "../models";
import {AddressFactory, TelegramChatFactory} from "../domain/abstractions/factories";
import {GetChat, TelegramBotClient} from "../clients/abstractions/telegram-bot-client";

@injectable()
export class TelegramChatRepositoryImpl implements TelegramChatRepository {
    constructor(
        @inject(Symbols.Clients.TelegramBot) private readonly telegramBotClient: TelegramBotClient,
        @inject(Symbols.Factories.TelegramChat) private readonly TelegramChatFactory: TelegramChatFactory,
        @inject(Symbols.Repositories.District) private readonly districtRepository: DistrictRepository,
        @inject(Symbols.Repositories.City) private readonly cityRepository: CityRepository,
        @inject(Symbols.Factories.Address) private readonly addressFactory: AddressFactory
    ) {
    }

    public async create(params: CreateTelegramChatRepositoryParams): Promise<TelegramChat> {
        const dataOfTelegramChat = await this.telegramBotClient.getChat({chat_id: params.chat_id})

        if(!dataOfTelegramChat.ok)
            throw new Error(JSON.stringify(dataOfTelegramChat))
        
        const telegramChat = new TelegramChatModel({
            name: dataOfTelegramChat.result.title,
            chat_id: dataOfTelegramChat.result.id,
            address: params.address,
            chat_type: this.telegramTypeConvertOwnType(dataOfTelegramChat.result.type)
        })

        await telegramChat.save()

        return this.toEntity(telegramChat)
    }

    public async getById(id: string): Promise<TelegramChat> {
        let getTelegramChat = await TelegramChatModel.findById<ITelegramChatModel>(id)

        if(!getTelegramChat)
            throw new Error("Telegram channel not found by id")

        return this.toEntity(getTelegramChat)
    }

    private telegramTypeConvertOwnType(chatType: GetChat.ChatTypes): TelegramChatType  {
        switch (chatType) {
            case GetChat.ChatTypes.PRIVATE:
                return TelegramChatType.PERSONAL

            case GetChat.ChatTypes.GROUP:
                return TelegramChatType.GROUP

            case GetChat.ChatTypes.SUPERGROUP:
                return TelegramChatType.SUPERGROUP

            case GetChat.ChatTypes.CHANNEL:
                return TelegramChatType.CHANNEL

            default:
                return TelegramChatType.UNKNOWN
        }
    }

    private async toEntity(TelegramChatModel: ITelegramChatModel): Promise<TelegramChat> {
        let city = await this.cityRepository.getById(TelegramChatModel.address.city_id)
        let district = await this.districtRepository.getById(TelegramChatModel.address.district_id)

        let address = this.addressFactory.create({
            home: TelegramChatModel.address.home,
            street: TelegramChatModel.address.street,
            city: city,
            district: district
        })

        return this.TelegramChatFactory.create({
            id: TelegramChatModel._id.toHexString(),
            name: TelegramChatModel.name,
            address: address,
            chatId: TelegramChatModel.chat_id,
            chatType: TelegramChatModel.chat_type,
            createAt: TelegramChatModel.create_at,
            updateAt: TelegramChatModel.update_at
        })
    }

}