import {Transport} from "../../abstractions";
import {inject, injectable, multiInject} from "inversify";
import express, {Express, Request, Response} from "express";
import {Logger} from "../../../components/abstractions/logger";
import {Symbols} from "../../../dependencies/symbols";
import http from "http";
import {RouterBase} from "./routers";
import {RouterConfig, RouterMethodTypes} from "../abstractions/http/decorators";

@injectable()
export class TransportHttpImpl implements Transport {
    private app: Express
    private server: http.Server

    constructor(
        @inject(Symbols.Infrastructures.Logger) private readonly logger: Logger,
        @multiInject(Symbols.Infrastructures.Routers) private readonly routers: RouterBase[]
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

        this.setConfig()
        this.setRouters()
        this.setListen()
    }

    private setConfig(): void {
        this.app.use(express.json())
    }

    private setRouters(): void {
        let routers = this.getRoutes()

        for (const router of routers) {
            this.setRouter(router)
        }
    }

    setRouter(router: RouterConfig): void {
        if(!router?.path)
            return

        switch (router.type) {
            case RouterMethodTypes.GET:
                this.app.get(router.path, (req: Request, res: Response) => router.method(req, res))
                break;

            case RouterMethodTypes.POST:
                this.app.post(router.path, (req: Request, res: Response) => router.method(req, res))
                break;
        }

        return
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