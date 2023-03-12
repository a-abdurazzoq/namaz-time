import {GenerateTokenServiceResponse, TokenService} from "../abstractions";
import jwt from "jsonwebtoken"
import {injectable} from "inversify";

@injectable()
export class TokenServiceImpl implements TokenService {
    private secretKey: string
    private expireInMillisecond: number

    constructor() {
        this.secretKey = String(process.env.SECRET_KEY)
        this.expireInMillisecond = Number(process.env.EXPIRE_IN_MILLISECOND)
    }

    public async verify<R>(text: string): Promise<R> {
        let result = jwt.verify(text, this.secretKey);

        return result as R
    }

    public async generate<T extends  string | object | Buffer>(data: T): Promise<GenerateTokenServiceResponse> {
        let generatedToken = jwt.sign(
            data,
            this.secretKey,
            { expiresIn: this.expireInMillisecond }
        );

        let expireOn = new Date();
        expireOn.setMilliseconds(expireOn.getMilliseconds()+this.expireInMillisecond);

        return {
            token: generatedToken,
            expireIn: this.expireInMillisecond,
            expireOn: expireOn
        }
    }

}