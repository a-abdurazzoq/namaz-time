export interface LoggerDto {
    result?: any;
    error?: any;
    date?: Date;
}

export interface Logger {
    print(logData: LoggerDto): Promise<void>
}