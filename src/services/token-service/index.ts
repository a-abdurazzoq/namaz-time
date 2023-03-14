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
        return new Promise<R>((resolve, reject) => {
            jwt.verify(text, this.secretKey, (error, decoded) => {
                if(error)
                    reject(error)

                resolve(decoded as R)
            });
        })
    }

    public async isValid(text: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            jwt.verify(text, this.secretKey, (error) => {
                if(error)
                    reject(false)

                resolve(true)
            });
        })
    }

    public async generate<T extends  string | object | Buffer>(data: T): Promise<GenerateTokenServiceResponse> {
        return new Promise<GenerateTokenServiceResponse>((resolve, reject) => {
            jwt.sign(data, this.secretKey, { expiresIn: this.expireInMillisecond }, (error, generatedToken) => {
                if(error)
                    return reject(error)

                if(!generatedToken)
                    return reject(new Error("Произошло ошибка при генерации токена"))

                let expireOn = new Date();
                expireOn.setMilliseconds(expireOn.getMilliseconds()+this.expireInMillisecond);

                resolve({
                    token: generatedToken,
                    expireIn: this.expireInMillisecond,
                    expireOn: expireOn
                })
            });
        })
    }

}