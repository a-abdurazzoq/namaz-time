export interface CryptoService {
    hash(text: string): Promise<string>;
    compare(params: CompareCryptoServiceParams): Promise<boolean>;
}

export interface CompareCryptoServiceParams {
    text: string;
    hash: string;
}