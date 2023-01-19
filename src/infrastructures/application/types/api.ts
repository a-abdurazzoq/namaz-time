import {Application} from "../../abstractions/application";

export class APIApplicationImpl implements Application {
    constructor(

    ) {}

    start(): Promise<void> {
        return Promise.resolve(undefined);
    }

    stop(): Promise<void> {
        return Promise.resolve(undefined);
    }
}