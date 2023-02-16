import {injectable} from "inversify";
import puppeteer from "puppeteer";

import {PhotoGenerationParams, TemplatePhotoService} from "../abstractions/template-photo-service";
import path from "path";

@injectable()
export class TemplatePhotoServiceImpl implements TemplatePhotoService {
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

}