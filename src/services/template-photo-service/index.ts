import {injectable} from "inversify";
import puppeteer from "puppeteer";
import path from "path";
import AdmZip from "adm-zip";

import {
    CreatePhotoTemplateUsingBase64Params,
    PhotoGenerationParams,
    TemplatePhotoService
} from "../abstractions";

@injectable()
export class TemplatePhotoServiceImpl implements TemplatePhotoService {
    public async createPhotoTemplateUsingBase64(params: CreatePhotoTemplateUsingBase64Params): Promise<string> {
        let dirName = this.generateDirNameForTemplatePhoto(params.additionalFileName)

        let pathToTemplatePhotoDirectory = path.join(String(process.env.PATH_TO_DIR_TEMPLATE_PHOTO))

        let zipFile = new AdmZip(Buffer.from(params.zipBase64, "base64"))

        await zipFile.extractAllTo(`${pathToTemplatePhotoDirectory}/${dirName}`)

        return dirName
    }

    public async photoGeneration(params: PhotoGenerationParams): Promise<Buffer> {
        let pathToTemplatePhotoDirectory = path.join(String(process.env.PATH_TO_DIR_TEMPLATE_PHOTO), params.htmlDirName)
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setViewport({width: 1080, height: 1080, deviceScaleFactor: 1});
        await page.goto(`${pathToTemplatePhotoDirectory}/index.html`);

        await page.evaluate((p: PhotoGenerationParams) => {
            let description = document.querySelector<HTMLElement>('.Description p')
            let date = document.querySelector<HTMLElement>('.Date p')
            let fajr = document.querySelector<HTMLElement>('.Fajr p')
            let shurooq = document.querySelector<HTMLElement>('.Sun p')
            let dhuhr = document.querySelector<HTMLElement>('.Dhuhr p')
            let asr = document.querySelector<HTMLElement>('.Asr p')
            let maghrib = document.querySelector<HTMLElement>('.Maghrib p')
            let isha = document.querySelector<HTMLElement>('.Isha p')
            let username = document.querySelector<HTMLElement>('.Username p')
            let whichCityTime = document.querySelector<HTMLElement>('.WhichCityTime p')

            if(description) description.innerText = p.description
            if(date) date.innerText = `${p.gregorianFullDate}  |  ${p.islamicFullDate}`
            if(fajr) fajr.innerText = p.fajr
            if(shurooq) shurooq.innerText = p.shurooq
            if(dhuhr) dhuhr.innerText = p.dhuhr
            if(asr) asr.innerText = p.asr
            if(maghrib) maghrib.innerText = p.maghrib
            if(isha) isha.innerText = p.isha
            if(username) username.innerText = p.username
            if(whichCityTime) whichCityTime.innerText = `${p.whichCityTime} вақти билан`
        }, params);

        let photoBuffer = await page.screenshot({
            clip: {width: 1080, height: 1080, x: 0, y: 0},
            encoding: 'binary',
        });

        await page.close();
        await browser.close();

        return photoBuffer
    }

    private generateDirNameForTemplatePhoto(name: string) {
        let filename = name
            .trim()
            .replace(/[\s_]{2,}/ig, " ")
            .replace(/\s/ig, "-")
            .replace(/[^(a-zA-Z0-9_\-)]/gmi, "")

        return `${filename}-${Date.now()}`
    }
}