export interface TemplatePhotoService {
    photoGeneration(params: PhotoGenerationParams): Promise<Buffer>;

    createPhotoTemplateUsingBase64(params: CreatePhotoTemplateUsingBase64Params): Promise<string>; //Вернёт назваения файла
}

export interface PhotoGenerationParams {
    htmlDirName: string;
    description: string;
    gregorianFullDate: string;
    islamicFullDate: string;
    fajr: string;
    shurooq: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
    username: string
    whichCityTime: string
}

export interface CreatePhotoTemplateUsingBase64Params {
    zipBase64: string;
    additionalFileName: string;
}