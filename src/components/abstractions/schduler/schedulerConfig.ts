export type millisecond = number

export interface SchedulerConfig {
    getTimeInterval(): millisecond;
}