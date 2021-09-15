import { Container } from 'instances-container'
import autoBind from 'auto-bind'
import { Request, ResponseToolkit } from '@hapi/hapi'
import AddCommentUseCase from '../../../../Applications/use_case/Comment/AddCommentUseCase'

class CommentsHandler {
    private container: Container

    constructor (container: Container) {
      this.container = container

      autoBind(this)
    }

    async postCommentHandler ({ payload, auth, params }: Request, h: ResponseToolkit) {
      const { id: userId } = auth.credentials
      const { threadId } = params

      const addCommentUseCase = this.container.getInstance(AddCommentUseCase.name) as AddCommentUseCase
      const addedComment = await addCommentUseCase.execute(payload, userId as string, threadId)

      return h.response({
        status: 'success',
        data: {
          addedComment
        }
      }).code(201)
    }
}

export default CommentsHandler
