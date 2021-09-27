import autoBind from 'auto-bind'
import { Container } from 'instances-container'
import { Request, ResponseToolkit } from '@hapi/hapi'
import AddReplyUseCase from '../../../../Applications/use_case/Reply/AddReplyUseCase'

class RepliesHandler {
  private container: Container;

  constructor (container: Container) {
    this.container = container

    autoBind(this)
  }

  async postReplyHandler ({ payload, auth, params }: Request, h: ResponseToolkit) {
    const { id: userId } = auth.credentials
    const { commentId } = params

    const addReplyUseCase = this.container.getInstance(AddReplyUseCase.name) as AddReplyUseCase
    const addedReply = await addReplyUseCase.execute(payload, userId as string, commentId)

    return h.response({
      status: 'success',
      data: {
        addedReply
      }
    }).code(201)
  }
}

export default RepliesHandler
