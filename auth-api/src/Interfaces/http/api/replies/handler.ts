import autoBind from 'auto-bind'
import { Container } from 'instances-container'
import { Request, ResponseToolkit } from '@hapi/hapi'
import AddReplyUseCase from '../../../../Applications/use_case/Reply/AddReplyUseCase'
import DeleteReplyUseCase from '../../../../Applications/use_case/Reply/DeleteReplyUseCase'

class RepliesHandler {
  private container: Container;

  constructor (container: Container) {
    this.container = container

    autoBind(this)
  }

  async postReplyHandler ({ payload, auth, params }: Request, h: ResponseToolkit) {
    const { id: userId } = auth.credentials
    const { commentId, threadId } = params

    const addReplyUseCase = this.container.getInstance(AddReplyUseCase.name) as AddReplyUseCase
    const addedReply = await addReplyUseCase.execute(payload, userId as string, commentId, threadId)

    return h.response({
      status: 'success',
      data: {
        addedReply
      }
    }).code(201)
  }

  async deleteReplyHandler ({ auth, params }: Request) {
    const { id: userId } = auth.credentials
    const { commentId, threadId, replyId } = params

    const deleteReplyUseCase = this.container.getInstance(DeleteReplyUseCase.name) as DeleteReplyUseCase
    await deleteReplyUseCase.execute(userId as string, threadId, commentId, replyId)
    return {
      status: 'success',
      message: 'replies berhasil dihapus'
    }
  }
}

export default RepliesHandler
