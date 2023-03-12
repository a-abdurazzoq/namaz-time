import {Request} from "express";

export * from "./authorization/is-admin-guard"

export interface Guard{
    check(context: GuardParams): Promise<GuardResponse>
}

export type GuardParams = Request

export type GuardResponse = HasAccess | NoAccess

interface HasAccess {
    access: true;
}

interface NoAccess {
    access: false;
    message: string;
}