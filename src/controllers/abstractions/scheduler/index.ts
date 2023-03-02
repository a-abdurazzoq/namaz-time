export interface SchedulerController {
    execute(): Promise<any>
}