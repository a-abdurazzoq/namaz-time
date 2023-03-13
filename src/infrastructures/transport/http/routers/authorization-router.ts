import {RouterBase, RRequest, RResponse} from "../../abstractions/http/routers";
import {inject, injectable} from "inversify";
import {Http} from "../decorators";
import {Symbols} from "../../../../dependencies/symbols";
import {AuthorizationController} from "../../../../controllers/abstractions";

namespace Authorization {
    export interface Login {
        username: string;
        password: string;
    }
    export interface Registration {
        username: string;
        password: string;
        full_name: string;
        phone_number: string;
    }
}

@injectable()
@Http.Router("authorization")
export class AuthorizationRouterImpl implements RouterBase {
    constructor(
        @inject(Symbols.Controllers.Authorization) private readonly authorizationController: AuthorizationController
    ) {}

    @Http.Post("login")
    public async login(req: RRequest<Authorization.Login>, res: RResponse): Promise<AuthorizationController.Login.Response> {
        let result = await this.authorizationController.login({
            username: req.body.username,
            password: req.body.password
        })

        res.setHeader("set-cookie", `token=${result.token}; Path=/; Max-Age=${result.expire_in}; HttpOnly; Secure; SameSite=None`)

        return result
    }

    @Http.Post("registration")
    public async registration(req: RRequest<Authorization.Registration>, res: RResponse): Promise<AuthorizationController.Registration.Response> {
        let result = await this.authorizationController.registration({
            fullName: req.body.full_name,
            username: req.body.username,
            password: req.body.password,
            phoneNumber: req.body.phone_number
        })

        res.setHeader("set-cookie", `token=${result.token}; Path=/; Max-Age=${result.expire_in}; HttpOnly; Secure; SameSite=None`)

        return result
    }
}