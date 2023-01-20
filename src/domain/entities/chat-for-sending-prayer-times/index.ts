export class ChatForSendingPrayerTimes {
    constructor(
        private id: string,
        private telegramChannelId: string,
        private chatId: number,
        private timePerDay: number,
        private nextTime: Date,
        private createAt: Date,
        private updateAt: Date
    ) {}

    public getTelegramChannelId(): string {
        return this.telegramChannelId
    }
    public getChatId(): number {
        return this.chatId
    }
    public getTimePerDay(): number {
        return this.timePerDay
    }
    public getNextTime(): Date {
        return this.nextTime
    }
    public getCreateAt(): Date {
        return this.createAt
    }
    public getUpdateAt(): Date {
        return this.updateAt
    }

    public updateNextTime(): Date {
        this.nextTime = this.getNextDayTime()

        return this.nextTime
    }

    private getNextDayTime(): Date {
        let newTime = new Date(this.nextTime.getTime())

        newTime.setDate(this.nextTime.getDate()+1)

        return newTime
    }
}