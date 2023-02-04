export interface TemplatePhotoService {
    photoGeneration(params: PhotoGenerationParams): Promise<Buffer>;
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