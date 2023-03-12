import {Request, Response} from "express";

export * from "./post-for-telegram-router"
export * from "./prayer-times-router"
export * from "./request-router"

export interface RouterBase {}

export type RRequest<body> = Request<body>
export type RResponse = Omit<Response, "json" | "jsonp" | "sendStatus" | "send" | "sendFile" | "sendDate" | "download">