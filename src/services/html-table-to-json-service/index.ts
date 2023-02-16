import {HtmlTableToJsonService} from "../abstractions/html-table-to-json-service";
import HTMLParser, {HTMLElement} from 'node-html-parser';
import {injectable} from "inversify";

@injectable()
export class HtmlTableToJsonServiceImpl implements HtmlTableToJsonService {
    table: HTMLElement
    keys: string[]
    valuesInArray: string[][]

    public parseJSON<R>(htmlString: string): R {
        this.init(htmlString)
        return this.valuesInArray.map(values => this.keys.reduce((current, value, index) => {
            return {
                ...current,
                [value]: values[index]
            }
        }, {})) as R
    }

    private init(htmlString: string) {
        this.table = HTMLParser.parse(htmlString)
        this.parseBody()
        this.parseHead()
    }

    private parseBody(): void {
        this.valuesInArray = this.table.querySelectorAll(".table > tr").map(doc => doc.querySelectorAll("td").map(value => value.innerText))
    }

    private parseHead(): void {
        let head = this.table.querySelectorAll("table > thead > tr")

        if(!head.length) {
            this.keys = this.valuesInArray.splice(0, 1)[0]
            return
        }

        this.keys = head.map(headKey => headKey.querySelectorAll("td").map(value => value.innerText))[0]
    }

}