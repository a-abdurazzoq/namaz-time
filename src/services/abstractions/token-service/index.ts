export interface TokenService {
    generate<T extends  string | object | Buffer>(data: T): Promise<GenerateTokenServiceResponse>;
    verify<R>(text: string): Promise<R>;
}

export interface GenerateTokenServiceResponse {
    token: string;
    expireIn: number;
    expireOn: Date;
}