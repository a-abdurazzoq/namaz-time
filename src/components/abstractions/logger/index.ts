export interface LogData {
    result?: any;
    error?: any;
    date?: Date;
}

export interface Logger {
    print(logData: LogData): Promise<void>
}