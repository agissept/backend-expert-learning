import { Container } from 'instances-container'
import { Request, ResponseToolkit } from '@hapi/hapi'
import autoBind from 'auto-bind'
import AddThreadUseCase from '../../../../Applications/use_case/Thread/AddThreadUseCase'
import GetDetailThreadUseCase from '../../../../Applications/use_case/Thread/GetDetailThreadUseCase'

class ThreadsHandler {
    private readonly container: Container;

    constructor (container: Container) {
      this.container = container

      autoBind(this)
    }

    async postThreadHandler ({ payload, auth }: Request, h: ResponseToolkit) {
      const addThreadUseCase = this.container.getInstance('AddThreadUseCase') as AddThreadUseCase
      const { id: userId } = auth.credentials
      const addedThread = await addThreadUseCase.execute(payload, userId as string)
      const response = h.response({
        status: 'success',
        data: {
          addedThread
        }
      })
      response.code(201)
      return response
    }

    async getDetailThreadHandler ({ params }: Request) {
      const { threadId } = params
      const getDetailThreadUseCase = this.container.getInstance(GetDetailThreadUseCase.name) as GetDetailThreadUseCase
      const thread = await getDetailThreadUseCase.execute(threadId)
      return {
        status: 'success',
        data: { thread }
      }
    }
}

export default ThreadsHandler
