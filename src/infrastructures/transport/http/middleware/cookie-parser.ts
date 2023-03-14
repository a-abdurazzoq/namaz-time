import {NextFunction, Request, Response} from "express";
import {Middleware} from "../../abstractions/http/middleware";
import {injectable} from "inversify";

@injectable()
export class CookieParserMiddleware implements Middleware {
    public execute(req: Request, res: Response, next: NextFunction) {
        let cookies: string = req.headers.cookie || ""

        req.cookies = Object.fromEntries(cookies
            .split("; ")
            .map(cookie => cookie.split("="))
        )

        next()
    }
}