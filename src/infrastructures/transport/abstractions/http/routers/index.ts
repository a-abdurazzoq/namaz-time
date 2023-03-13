import {Request, Response} from "express";

export interface RouterBase {}

export type RRequest<body> = Request<any, any, body>
export type RResponse = Omit<Response, "json" | "jsonp" | "sendStatus" | "send" | "sendFile" | "sendDate" | "download">