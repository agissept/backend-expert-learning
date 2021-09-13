import { Container } from 'instances-container'
import LoginUserUseCase from '../../../../Applications/use_case/LoginUserUseCase'
import { Request, ResponseToolkit } from '@hapi/hapi'
import autoBind from 'auto-bind'
import RefreshAuthenticationUseCase from '../../../../Applications/use_case/RefreshAuthenticationUseCase'
import LogoutUserUseCase from '../../../../Applications/use_case/LogoutUserUseCase'

class AuthenticationsHandler {
    private readonly container: Container;

    constructor (container: Container) {
      this.container = container

      autoBind(this)
    }

    async postAuthenticationHandler (request: Request, h: ResponseToolkit) {
      const loginUserUseCase = this.container.getInstance('LoginUserUseCase') as LoginUserUseCase
      const { accessToken, refreshToken } = await loginUserUseCase.execute(request.payload as any)
      const response = h.response({
        status: 'success',
        data: {
          accessToken,
          refreshToken
        }
      })
      response.code(201)
      return response
    }

    async putAuthenticationHandler (requestPayload: Request, h: ResponseToolkit) {
      const refreshAuthenticationUseCase = this.container.getInstance(RefreshAuthenticationUseCase.name) as RefreshAuthenticationUseCase
      const accessToken = await refreshAuthenticationUseCase.execute(requestPayload.payload)
      return h.response({
        status: 'success',
        data: {
          accessToken
        }
      })
    }

    async deleteAuthenticationHandler (requestPayload: Request) {
      const logoutUserUseCase = this.container.getInstance(LogoutUserUseCase.name)
      logoutUserUseCase.execute(requestPayload.payload)
      return {
        status: 'success'
      }
    }
}

export default AuthenticationsHandler
