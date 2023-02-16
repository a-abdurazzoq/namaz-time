import {LoggerDto, Logger} from "../abstractions/logger";
import {injectable} from "inversify";
import * as util from "util";

interface LoggerData extends Omit<LoggerDto, "date"> {
    date: string
}

interface LoggerResultData extends Omit<LoggerData, "error"> {}

interface LoggerErrorData extends Omit<LoggerData, "result"> {}

@injectable()
export class ConsoleLogger implements Logger {
    public async print(loggerDto: LoggerDto): Promise<void> {
        let loggerData: LoggerData = {
            result: loggerDto.result,
            error: loggerDto.error,
            date: this.printTime(loggerDto.date)
        }

        if(loggerData.error)
            this.printError(loggerData)

        if(loggerData.result)
            this.printResult(loggerData)
    }

    private printResult(loggerData: LoggerResultData) {
        console.log(loggerData.date, "-", "RESULT", "-", this.inspect(loggerData.result))
    }

    private printError(loggerData: LoggerErrorData) {
        console.error(loggerData.date, "-", "ERROR", "-", this.inspect(loggerData.error))
    }

    private inspect(data: object) {
        return util.inspect(data, {showHidden: false, depth: null, colors: true})
    }

    private printTime(date: Date = new Date()): string {
        let timeString = Intl.DateTimeFormat("mn-MN", {dateStyle: "short", timeStyle: "medium"}).format(date)

        return `${timeString}.${date.getMilliseconds()}`
    }
}
