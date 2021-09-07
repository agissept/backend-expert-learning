import autoBind from 'auto-bind'
import AddUserUseCase from '../../../../Applications/use_case/AddUserUseCase'
import { Request, ResponseToolkit } from '@hapi/hapi'

class UsersHandler {
    private container: any;

    constructor (container: any) {
      this.container = container

      autoBind(this)
    }

    async postUserHandler (request: Request, h: ResponseToolkit) {
      const addUserUseCase = this.container.getInstance(AddUserUseCase.name)
      const addedUser = await addUserUseCase.execute(request.payload)

      const response = h.response({
        status: 'success',
        data: {
          addedUser
        }
      })
      response.code(201)
      return response
    }
}

export default UsersHandler
