import {Container} from "instances-container";
import LoginUserUseCase from "../../../../Applications/use_case/LoginUserUseCase";
import { Request, ResponseToolkit } from '@hapi/hapi'
import autoBind from "auto-bind";


class AuthenticationsHandler {
    private readonly container: Container;

    constructor(container: Container) {
        this.container = container;

        autoBind(this)
    }

    async postAuthenticationHandler(request: Request, h: ResponseToolkit) {
        const loginUserUseCase = this.container.getInstance('LoginUserUseCase');
        const { accessToken, refreshToken } = await loginUserUseCase.execute(request.payload);
        const response = h.response({
            status: 'success',
            data: {
                accessToken,
                refreshToken,
            },
        });
        response.code(201);
        return response;
    }
}

export default AuthenticationsHandler
