import {LogData, Logger} from "../abstractions/logger";
import {injectable} from "inversify";

@injectable()
export class ConsoleLogger implements Logger {
    public async print(logData: LogData): Promise<void> {
        if (!logData.date) logData.date = new Date()

        if(logData.error)
            this.printError(logData)

        if(logData.result)
            this.printResult(logData)
    }

    private printError(logData: Omit<LogData, "result">) {
        console.log(logData.date, "-", "ERROR", "-", logData.error)
    }

    private printResult(logData: Omit<LogData, "error">) {
        console.log(logData.date, "-", "RESULT", "-", logData.result)
    }
}