import {Token, User} from "../domain/entities";
import {ITokenModel, TokenModel} from "../models/token";
import {inject, injectable} from "inversify";
import {Symbols} from "../dependencies/symbols";
import {UserRepository, DataInToken, TokenRepository} from "./abstractions";
import {TokenFactory} from "../domain/abstractions/factories";
import {GenerateTokenServiceResponse, TokenService} from "../services/abstractions";
import {Types} from "mongoose";

@injectable()
export class TokenRepositoryImpl implements TokenRepository {
    constructor(
        @inject(Symbols.Factories.Token) private readonly tokenFactory: TokenFactory,
        @inject(Symbols.Repositories.User) private readonly userRepository: UserRepository,
        @inject(Symbols.Services.Token) private readonly tokenService: TokenService
    ) {
    }

    public async create(user: User): Promise<Token> {
        let generatedToken = await this.generateToken(user)

        let tokenModel = new TokenModel({
            user_id: new Types.ObjectId(user.getId()),
            token: generatedToken.token,
            expire_in: generatedToken.expireIn,
            expire_on: generatedToken.expireOn
        })

        await tokenModel.save()

        return this.toEntity(tokenModel)
    }

    public async getByToken(token: string): Promise<Token | null> {
        let getToken = await TokenModel.findOne({token: token})

        if(!getToken)
            throw new Error("Token not found by token")

        return this.toEntity(getToken)
    }

    public async updateByUserId(user: User): Promise<Token> {
        let generatedToken = await this.generateToken(user)

        let updatedTokenModel = await TokenModel.findOneAndUpdate(
            {user_id: new Types.ObjectId(user.getId())},
            {
                $set: {
                    token: generatedToken,
                    expire_in: generatedToken.expireIn,
                    expire_on: generatedToken.expireOn,
                    update_at: new Date()
                }
            }
        );

        if(!updatedTokenModel)
            throw new Error("Token not found by user id")

        return this.toEntity(updatedTokenModel)
    }

    public async hasTokenByUserId(user: User): Promise<boolean> {
        let getToken = await TokenModel.findOne({user_id: new Types.ObjectId(user.getId())})

        return !!getToken
    }

    public async hasToken(token: string): Promise<boolean> {
        let getToken = await TokenModel.findOne({token: token})

        return !!getToken
    }

    private generateToken(user: User): Promise<GenerateTokenServiceResponse> {
        return this.tokenService.generate<DataInToken>({
            id: user.getId(),
            username: user.getUsername(),
            phoneNumber: user.getPhoneNumber()
        })
    }

    private async toEntity(tokenModel: ITokenModel): Promise<Token> {
        let user = await this.userRepository.getById(tokenModel.user_id.toHexString())

        return this.tokenFactory.create({
            id: tokenModel._id.toHexString(),
            token: tokenModel.token,
            user: user,
            expireIn: tokenModel.expire_in,
            expireOn: tokenModel.expire_on,
            createAt: tokenModel.create_at,
            updateAt: tokenModel.update_at
        })
    }
}