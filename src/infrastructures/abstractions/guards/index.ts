import {RRequest} from "../../transport/abstractions/http/routers";

export * from "./authorization/is-admin-guard"

export interface Guard{
    check(context: GuardParams): Promise<GuardResponse>
}

export type GuardParams = RRequest<void>

export type GuardResponse = HasAccess | NoAccess

interface HasAccess {
    access: true;
}

interface NoAccess {
    access: false;
    message: string;
}