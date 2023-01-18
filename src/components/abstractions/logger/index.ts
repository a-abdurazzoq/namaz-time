interface LogData {
    result?: any;
    error?: any;
    date?: Date;
}

interface Logger {
    print(logData: LogData): Promise<void>
}