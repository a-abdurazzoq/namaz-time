import {Request, Response} from "express";

export enum RouterMethodTypes {
    GET = "GET",
    POST = "POST"
}

export interface RouterConfig {
    path: string;
    type: RouterMethodTypes;
    method: (req: Request, res: Response) => Promise<any>
}
