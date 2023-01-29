export interface TelegramBotClient {
    sendPhoto(params: SendPhoto.Params): Promise<SendPhoto.Response>
}

export namespace SendPhoto {
    export interface Params extends BasicParams {
        photo: Buffer;
        caption?: string;
    }

    export type Response = FailedResult | SuccessResult
}

interface BasicParams {
    chat_id: number;
}

interface FailedResult {
    ok: false;
    error_code: number;
    description: string;
}

interface SuccessResult<Result = any> {
    ok: true;
    result: Result;
}