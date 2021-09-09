import autoBind from 'auto-bind'
import AddUserUseCase from '../../../../Applications/use_case/AddUserUseCase'
import { Request, ResponseToolkit } from '@hapi/hapi'
import DomainErrorTranslator from '../../../../Commons/exceptions/DomainErrorTranslator'
import { Container } from 'instances-container'
import ClientError from '../../../../Commons/exceptions/ClientError'

class UsersHandler {
  private container: Container;

  constructor (container: any) {
    this.container = container

    autoBind(this)
  }

  async postUserHandler (request: Request, h: ResponseToolkit) {
    try {
      const addUserUseCase = this.container.getInstance(AddUserUseCase.name) as AddUserUseCase
      const addedUser = await addUserUseCase.execute(request.payload)

      const response = h.response({
        status: 'success',
        data: {
          addedUser
        }
      })
      response.code(201)
      return response
    } catch (error) {
      const translatedError = DomainErrorTranslator.translate(error as Error)

      if (translatedError instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: translatedError.message
        })
        response.code(translatedError.statusCode)
        return response
      }
      const response = h.response({
        status: 'error',
        message: 'terjadi kegagalan pada server kami'
      })
      response.code(500)
      return response
    }
  }
}

export default UsersHandler
