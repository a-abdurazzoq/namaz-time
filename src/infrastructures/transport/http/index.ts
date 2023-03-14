import http from "http";
import express, {Express, Request, Response} from "express"
import {inject, injectable, multiInject} from "inversify";

import {Transport} from "../../abstractions";
import {Logger} from "../../../components/abstractions/logger";
import {Symbols} from "../../../dependencies/symbols";
import {RouterBase} from "../abstractions/http/routers";
import {RouterConfig, RouterMethodTypes} from "../abstractions/http/decorators";
import {Middleware} from "../abstractions/http/middleware";
import {IsAdminGuard} from "../../abstractions/guards";

@injectable()
export class TransportHttpImpl implements Transport {
    private app: Express
    private server: http.Server

    constructor(
        @inject(Symbols.Infrastructures.Logger) private readonly logger: Logger,
        @inject(Symbols.Infrastructures.Guard.IsAdmin) private readonly isAdminGuard: IsAdminGuard,
        @multiInject(Symbols.Infrastructures.Http.Routers) private readonly routers: RouterBase[],
        @multiInject(Symbols.Infrastructures.Http.Middleware) private readonly middleware: Middleware[]
    ) {}

    public async start(): Promise<void> {
        await this.init()

        return
    }

    public async stop(): Promise<void> {
        await this.server.close(() => this.logger.print({alert: `Сервер на порте ${process.env.PORT} отключено`}))

        return
    }

    private init(): void {
        this.app = express()

        this.setMiddleware()
        this.setRouters()
        this.setListen()
    }

    private setMiddleware(): void {
        this.app.use(express.json({limit: '50mb'}))
        this.app.use(...this.middleware.map(middleware => middleware.execute))
    }

    private setRouters(): void {
        let routers = this.getRoutes()

        for (const router of routers) {
            this.setRouter(router)
        }
    }

    private setRouter(router: RouterConfig): void {
        if(!router?.path)
            return

        switch (router.type) {
            case RouterMethodTypes.GET:
                    this.setGetMethod(router)
                break;

            case RouterMethodTypes.POST:
                    this.setPostMethod(router)
                break;
        }

        return
    }

    private setGetMethod(router: RouterConfig) {
        this.app.get(router.path, this.method(router))
    }

    private setPostMethod(router: RouterConfig) {
        this.app.post(router.path, this.method(router))
    }

    private method(router: RouterConfig) {
        let _this = this

        return async function (req: Request, res: Response) {
            try {
                let checkGuards = await _this.checkGuards(router, req)

                if(checkGuards) {
                    res.status(checkGuards.code).json({
                        success: false,
                        data: {
                            message: checkGuards.message
                        }
                    })

                    return
                }

                let result = await router.method(req, res)

                res.status(200).json({
                    success: true,
                    data: result
                })
            }
            catch (error: any) {
                res.status(500).json({
                    success: false,
                    data: {
                        message: error.message
                    }
                })

                await _this.logger.print({error: error})
            }
        }
    }

    private async checkGuards(router: RouterConfig, req: Request): Promise<{code: number; message: string;} | null> {
        if("isAdmin" in router.guard) {
            let checkIsAdmin = await this.isAdminGuard.check(req)

            if (!checkIsAdmin.access)
                return {
                    code: 401,
                    message: checkIsAdmin.message
                }
        }

        return null
    }

    private getRoutes(): RouterConfig[] {
        let routers: RouterConfig[] = []

        for (const router of this.routers) {
            for (const routerConfig of router.constructor.prototype.routers) {
                routerConfig.method = routerConfig.method.bind(router)
                routers.push(routerConfig)
            }
        }

        return routers
    }

    private setListen(): void {
        this.server = this.app.listen(
            process.env.PORT,
            () => this.logger.print({info: `Сервер работает по адресу http://localhost:${process.env.PORT}`})
        )

        return
    }
}