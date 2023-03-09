import {injectable} from "inversify";
import puppeteer from "puppeteer";
import path from "path";
import fs from "fs/promises"

import {
    CreatePhotoTemplateUsingBase64Params,
    PhotoGenerationParams,
    TemplatePhotoService
} from "../abstractions/template-photo-service";

@injectable()
export class TemplatePhotoServiceImpl implements TemplatePhotoService {
    public async createPhotoTemplateUsingBase64(params: CreatePhotoTemplateUsingBase64Params): Promise<string> {
        let fileName = this.generateHtmlFileNameForTemplatePhoto(params.additionalFileName)
        let pathToTemplatePhotoDirectory = path.join(String(process.env.PATH_TO_DIR_TEMPLATE_PHOTO))

        await fs.writeFile(`${pathToTemplatePhotoDirectory}/${fileName}`, params.base64, "base64")

        return fileName
    }

    public async photoGeneration(params: PhotoGenerationParams): Promise<Buffer> {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setViewport({width: 1080, height: 1080, deviceScaleFactor: 1});
        await page.goto("file://D:/Projects/namaz-time/templates/default.html");

        await page.evaluate((p: PhotoGenerationParams) => {
            let date = document.querySelector<HTMLElement>('.Date p')
            let fajr = document.querySelector<HTMLElement>('.Fajr p')
            let shurooq = document.querySelector<HTMLElement>('.Sun p')
            let dhuhr = document.querySelector<HTMLElement>('.Dhuhr p')
            let asr = document.querySelector<HTMLElement>('.Asr p')
            let maghrib = document.querySelector<HTMLElement>('.Maghrib p')
            let isha = document.querySelector<HTMLElement>('.Isha p')

            if(date) date.innerText = `${p.gregorianFullDate}  |  ${p.islamicFullDate}`
            if(fajr) fajr.innerText = p.fajr
            if(shurooq) shurooq.innerText = p.shurooq
            if(dhuhr) dhuhr.innerText = p.dhuhr
            if(asr) asr.innerText = p.asr
            if(maghrib) maghrib.innerText = p.maghrib
            if(isha) isha.innerText = p.isha
        }, params);

        let photoBuffer = await page.screenshot({
            clip: {width: 1080, height: 1080, x: 0, y: 0},
            encoding: 'binary',
        });

        await page.close();
        await browser.close();

        return photoBuffer
    }

    private generateHtmlFileNameForTemplatePhoto(name: string) {
        let filename = name
            .trim()
            .replace(/[\s_]{2,}/ig, " ")
            .replace(/\s/ig, "-")
            .replace(/[^(a-zA-Z0-9_\-)]/gmi, "")

        return `${filename}-${Date.now()}.html`
    }
}