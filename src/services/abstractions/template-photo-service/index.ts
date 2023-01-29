export interface TemplatePhotoService {
    photoGeneration(params: PhotoGenerationParams): Promise<Buffer>;
}

export interface PhotoGenerationParams {
    htmlFileName: string;
    date: string;
    fajr: string;
    sun: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
}