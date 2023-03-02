export interface TemplatePhotoService {
    photoGeneration(params: PhotoGenerationParams): Promise<Buffer>;

    createPhotoTemplateUsingBase64(params: CreatePhotoTemplateUsingBase64Params): Promise<string>; //Вернёт назваения файла
}

export interface PhotoGenerationParams {
    htmlFileName: string;
    gregorianFullDate: string;
    islamicFullDate: string;
    fajr: string;
    shurooq: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
}

export interface CreatePhotoTemplateUsingBase64Params {
    base64: string;
    additionalFileName: string;
}